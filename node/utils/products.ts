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

    return {
      id: s.id,
      productName: sku?.nameComplete,
      image: sku?.images[0].imageUrl,
      sellingPrice: sku?.sellers[0].commertialOffer.Price,
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
