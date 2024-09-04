const getPriceWithDecimal = (num: number): string => {
  if (!num) return Number(0).toFixed(2)
  const dec = num.toString().split('.')[1]
  const len = dec && dec.length > 2 ? dec.length : 2

  return Number(num).toFixed(len)
}

export const mapProducts = (
  products: SearchProduct[],
  skus: SkuURLItem[]
): MailItem[] => {
  return skus.map<MailItem>((s: SkuURLItem) => {
    let sku: SearchItem | undefined
    const product = products.find((p: SearchProduct) => {
      sku = p.items.find((i: SearchItem) => i.itemId === s.id)

      return sku !== undefined
    })

    const sellingPrice = getPriceWithDecimal(
      sku?.sellers[0].commertialOffer.Price as number
    )

    return {
      id: s.id,
      productName: sku?.nameComplete,
      image: sku?.images[0].imageUrl,
      sellingPrice,
      quantity: s.qty,
      link: product?.linkText,
      availabilityQuantity: sku?.sellers[0].commertialOffer.AvailableQuantity,
    }
  })
}

export const mapSkus = (skuURL: string) => {
  const skus = skuURL.match(/(sku|qty|seller|sc)=[0-9]+/g)
  let counter = 0

  return (
    skus?.reduce((accum: SkuURLItem[], currentValue: string) => {
      const splitted = currentValue.split('=')

      if (splitted[0] === 'sku') {
        accum.push({
          id: splitted[1],
          qty: '',
          seller: '',
          sc: '',
        })
        counter++

        return accum
      }

      accum[counter - 1] = {
        ...accum[counter - 1],
        [splitted[0]]: splitted[1],
      }

      return accum
    }, []) ?? []
  )
}

export const mapPvtProducts = (products: any[], items: any[]): any[] => {
  return products.map((product: any) => {
    const item = items.find(
      (i: any) => Number.parseInt(i.id, 10) === product.Id
    )

    return {
      linkText: product?.DetailUrl.replace('/p', '').replace('/', ''),
      items: [
        {
          itemId: item.id,
          nameComplete: product?.NameComplete,
          images: product?.Images.map((img: any) => ({
            imageUrl: img.ImageUrl,
          })),
          sellers: [
            {
              commertialOffer: {
                Price: item.sellingPrice,
                AvailableQuantity:
                  item?.availability === 'available' ? 9999 : 0,
              },
            },
          ],
        },
      ],
    }
  })
}

export const isSalesChannelPrivate = (error: any) => {
  return (
    error?.response?.status === 400 &&
    error?.response?.data === 'Sales channel not found'
  )
}
