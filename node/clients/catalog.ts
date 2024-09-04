import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'

import { mapPvtProducts } from '../utils/products'

export default class Catalog extends JanusClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super(ctx, {
      ...opts,
      headers: {
        ...(opts?.headers ?? {}),
        VtexIdclientAutCookie: ctx.authToken,
        'Proxy-Authorization': ctx.authToken,
      },
    })
  }

  private simulation(skus: SkuURLItem[]): Promise<any> {
    return this.http.post('/api/checkout/pub/orderForms/simulation', {
      items: skus.map(({ id, qty, seller }) => ({ id, quantity: qty, seller })),
    })
  }

  private async getProductPvt(skuId: string): Promise<SearchProduct> {
    return this.http.get(
      `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`,
      {
        metric: 'products-get',
      }
    )
  }

  public async getProductsPvt(skus: SkuURLItem[]): Promise<any[]> {
    const { items } = (await this.simulation(skus)) ?? { items: [] }
    const products = await Promise.all(
      items.map((item: any) => this.getProductPvt(item.id))
    )

    return mapPvtProducts(products, items)
  }

  public async getProducts(skus: SkuURLItem[]): Promise<SearchProduct[]> {
    const searchQS = skus
      ?.map((sku: SkuURLItem) => `fq=skuId:${sku.id}`)
      .join('&')

    return this.http.get(
      `/api/catalog_system/pub/products/search?${searchQS}`,
      {
        metric: 'products-get',
      }
    )
  }
}
