'use strict'
import { Promise, defer } from 'q'
import Util from './Util'

export default class Container {

  private container: any

  constructor(container: any) {
    this.container = container
  }

  remove(): Promise<any> {
    const p = defer()
    this.container.remove(Util.callbackToPromise(p))
    return p.promise
  }

  start(): Promise<any> {
    const p = defer()
    this.container.start(Util.callbackToPromise(p))
    return p.promise
  }
  stop(): Promise<any> {
    const p = defer()
    this.container.stop(Util.callbackToPromise(p))
    return p.promise
  }
  inspect(): Promise<any> {
    const p = defer()
    this.container.inspect(Util.callbackToPromise(p))
    return p.promise
  }
}
