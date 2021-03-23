import {
  JanusClient,
  InstanceOptions,
  IOContext,
} from '@vtex/api'
import { pipe } from 'ramda'

const withCookieAsHeader = (context: IOContext) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    VtexIdclientAutCookie: context.authToken,
    ...((options && options.headers) || {}),
  },
})

export default class Message extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options && pipe(withCookieAsHeader(context))(options))
  }

  public async sendMail(abandonedCartData: any, abandonedCartTemplate: string): Promise<string> {
    const data = {
      "templateName": abandonedCartTemplate,
      "jsonData": {
        ...abandonedCartData
      }
    }

    return this.http.post(`/api/mail-service/pvt/sendmail`, data)
  }


}
