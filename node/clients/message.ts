import {
  ExternalClient,
  InstanceOptions,
  IOContext,
} from '@vtex/api'

export default class Message extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br/api/mail-service/pvt/`, context, options)
  }

  public async sendMail(abandonedCartData: any, abandonedCartTemplate: string, tokens: {appKey: string, appToken: string}): Promise<string> {
    const data = {
      "accountName": this.context.account,
      "serviceType": 0,
      "templateName": abandonedCartTemplate,
      "jsonData": {
        ...abandonedCartData
      }
    }

    return this.http.post(`sendmail`, data, {
      metric: 'send-mail',
      headers: {
        'X-VTEX-API-AppToken': tokens.appToken,
        'X-VTEX-API-AppKey': tokens.appKey,
        'X-Vtex-Use-Https': "true"
      }
    })
  }


}
