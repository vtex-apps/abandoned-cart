import {
  AppClient,
  InstanceOptions,
  IOContext,
} from '@vtex/api'

export default class Catalog extends AppClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy@0.x', ctx, opts)
  }

  public async getProducts(skus: any[]): Promise<string> {

    const searchQS = skus?.map((sku: any) => `fq=skuId:${sku.id}`).join('&')
    const sc = skus[0]?.sc || 1

    return this.http.get(`/proxy/catalog/pub/products/search?${searchQS}&sc=${sc}`, {
      metric: 'products-get'
    })
  }
}
