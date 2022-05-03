import { EventContext } from '@vtex/api'

import { Clients } from '../clients'

export async function configureMailTemplate(ctx: EventContext<Clients>) {
  const {
    clients: { message: messageClient },
    body: { to },
  } = ctx

  if (to) {
    const [appName] = to?.id?.split('@')

    if (
      appName.length &&
      `${process.env.VTEX_APP_VENDOR}.${process.env.VTEX_APP_NAME}` === appName
    ) {
      const response = await messageClient.sendTemplate()

      return response
    }
  }

  return null
}
