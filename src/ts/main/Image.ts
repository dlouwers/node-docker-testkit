'use strict'
import { Promise, defer } from 'q'
import Util from './Util'

export default class Image {
  private image: any
  constructor(image: any) {
    this.image = image
  }
  remove(): Promise<any> {
    const p = defer()
    this.image.remove(Util.callbackToPromise(p))
    return p.promise
  }
  history(): Promise<any> {
    const p = defer()
    this.image.history(Util.callbackToPromise(p))
    return p.promise
  }
  inspect(): Promise<any> {
    const p = defer()
    this.image.inspect(Util.callbackToPromise(p))
    return p.promise
  }
}
