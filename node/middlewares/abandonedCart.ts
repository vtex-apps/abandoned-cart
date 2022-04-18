import { json } from 'co-body'

import { mapProducts, mapSkus } from '../utils/products'

interface AbandonedCart {
  skuURL: string
  email: string
  template: string
  additionalFields: any
}

export async function abandonedCart(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { catalog: catalogClient, message: messageClient },
  } = ctx

  const body: AbandonedCart = await json(ctx.req)

  const skus = mapSkus(body.skuURL)
  const products = await catalogClient.getProducts(skus)

  const items = mapProducts(products, skus).filter(
    value =>
      value.availabilityQuantity !== undefined && value.availabilityQuantity > 0
  )

  if (items.length > 0) {
    await messageClient.sendMail(
      {
        email: body.email,
        items,
        addToCartURL: body.skuURL,
        additionalFields: body.additionalFields,
      },
      body.template
    )
  }

  ctx.status = 200
  ctx.body = 'ok'
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
