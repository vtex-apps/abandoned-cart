// export const mapProducts = (products: any) => {
//   return products.map((p: any) => ({
//     id: p.productId,
//     image: p.items[0].images[0].imageUrl,
//     sellingPrice: p.items[0].sellers[0].commertialOffer.Price,
//     quantity: 1
//   }))
// }

export const mapProducts = (products: any, skus: any) => {
  return skus.map((s: any) => {
    let sku:any;
    const product = products.find((p: any) => {
      sku = p.items.find((i: any) => i.itemId === s.id)

      return sku !== undefined
    })

    return {
      id: s.id,
      productName: sku?.nameComplete,
      image: sku?.images[0].imageUrl,
      sellingPrice: sku?.sellers[0].commertialOffer.Price,
      quantity: s.qty,
      link: product.linkText
    }
  })
}

export const mapSkus = (skuURL: string) => {
  const skus = skuURL.match(/(sku|qty|seller)=[0-9]+/g)
  let counter = 0
  return skus?.reduce((accum: any, currentValue) => {
    const splitted = currentValue.split('=')
    if (splitted[0] === 'sku') {
      accum.push({
        id: splitted[1]
      })
      counter++;
      return accum
    }

    accum[counter-1] = {
      ...accum[counter-1],
      [splitted[0]]: splitted[1]
    }
    return accum
  }, []) || []
}
