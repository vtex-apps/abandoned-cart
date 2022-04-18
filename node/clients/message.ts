import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'
import { pipe } from 'ramda'

import configEmail from '../configs/configEmail'

interface AbandonedCartMailParameters {
  items: MailItem[]
  email: string
  addToCartURL: string
  additionalFields: any
}

const withCookieAsHeader = (context: IOContext) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    VtexIdclientAutCookie: context.authToken,
    ...(options?.headers ?? {}),
  },
})

export default class Message extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options && pipe(withCookieAsHeader(context))(options))
  }

  public async sendMail(
    abandonedCartData: AbandonedCartMailParameters,
    abandonedCartTemplate: string
  ): Promise<string> {
    const data = {
      templateName: abandonedCartTemplate,
      jsonData: {
        ...abandonedCartData,
      },
    }

    return this.http.post(`/api/mail-service/pvt/sendmail`, data)
  }

  public async sendTemplate(): Promise<any> {
    const data = {
      ...configEmail,
    }

    return this.http.post(`/api/template-render/pvt/templates`, data)
  }
}
