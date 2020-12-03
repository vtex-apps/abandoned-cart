import { IOClients } from '@vtex/api'
import Catalog from './catalog'
import Message from './message'

import Status from './status'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get message() {
    return this.getOrSet('message', Message)
  }
}
