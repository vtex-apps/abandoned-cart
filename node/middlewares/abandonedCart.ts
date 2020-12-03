import { json } from 'co-body'
import { mapProducts, mapSkus } from '../utils/products'
export async function abandonedCart(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { catalog: catalogClient, message: messageClient },
  } = ctx

  console.log('Headers', ctx.req.headers['x-vtex-api-apptoken'])

  const body: {skuURL: string, email: string, template: string} = await json(ctx.req)

  const skus = mapSkus(body.skuURL)
  const products = await catalogClient.getProducts(skus)

  const items = mapProducts(products, skus)
  const tokens = {
    appToken: ctx.req.headers['x-vtex-api-apptoken'] as string,
    appKey: ctx.req.headers['x-vtex-api-appkey'] as string
  }
  await messageClient.sendMail({ email: body.email, items, addToCartURL: body.skuURL }, body.template, tokens);

  ctx.status = 200
  ctx.body = 'ok'
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
