import {
  AppClient,
  InstanceOptions,
  IOContext,
} from '@vtex/api'

export default class Catalog extends AppClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy@0.x', ctx, opts)
  }

  public async getProducts(skus: string[]): Promise<string> {

    const searchQS = skus?.map((sku: any) => `fq=skuId:${sku.id}`).join('&')

    return this.http.get(`/proxy/catalog/pub/products/search?${searchQS}`, {
      metric: 'products-get'
    })
  }
}
