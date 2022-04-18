import {
  ClientsConfig,
  method,
  Service,
  ServiceContext,
  RecorderState,
} from '@vtex/api'

import { Clients } from './clients'
import { abandonedCart } from './middlewares/abandonedCart'
import { configureMailTemplate } from './events/configureMailTemplate'

const TIMEOUT_MS = 10000
const CONCURRENCY = 10

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    events: {
      exponentialTimeoutCoefficient: 2,
      exponentialBackoffCoefficient: 2,
      initialBackoffDelay: 50,
      retries: 1,
      timeout: TIMEOUT_MS,
      concurrency: CONCURRENCY,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  events: {
    configureMailTemplate,
  },
  routes: {
    abandonedCart: method({
      POST: [abandonedCart],
    }),
  },
})
