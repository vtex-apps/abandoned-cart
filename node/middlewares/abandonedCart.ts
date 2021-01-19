import { json } from 'co-body'
import { mapProducts, mapSkus } from '../utils/products'
export async function abandonedCart(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { catalog: catalogClient, message: messageClient },
  } = ctx

  const body: {skuURL: string, email: string, template: string, additionalFields: any} = await json(ctx.req)

  const skus = mapSkus(body.skuURL)
  console.log('items', skus)
  const products = await catalogClient.getProducts(skus)

  const items = mapProducts(products, skus)
  console.log(items)
  await messageClient.sendMail({ email: body.email, items, addToCartURL: body.skuURL, additionalFields: body.additionalFields }, body.template);

  ctx.status = 200
  ctx.body = 'ok'
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
