'use strict'
import { Promise, defer } from 'q'

export default class Container {
  private container: any
  constructor(container: any) {
    this.container = container
  }
  remove(): Promise<any> {
    const p = defer()
    this.container.remove((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
  start(): Promise<any> {
    const p = defer()
    this.container.start((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
  stop(): Promise<any> {
    const p = defer()
    this.container.stop((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
  inspect(): Promise<any> {
    const p = defer()
    this.container.inspect((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
}
