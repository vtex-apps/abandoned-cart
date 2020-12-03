import {
  ExternalClient,
  InstanceOptions,
  IOContext,
} from '@vtex/api'

export default class Catalog extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br/api/catalog_system/pub/`, context, options)
  }

  public async getProducts(skus: string[]): Promise<string> {

    const searchQS = skus?.map((sku: any) => `fq=skuId:${sku.id}`).join('&')

    return this.http.get(`products/search?${searchQS}`, {
      metric: 'products-get',
      headers: {
        "X-Vtex-Use-Https": "true"
      }
    })
  }
}
