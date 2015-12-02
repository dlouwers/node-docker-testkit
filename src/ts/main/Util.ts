'use strict'
import { Deferred, Promise, defer } from 'q'

export default class Util {
  static streamToPromise(stream: any): Promise<any> {
    const p = defer()
    stream.setEncoding('utf8')
    stream.on('data', (d) => null)
    stream.on('error', (err) => p.reject(err))
    stream.on('end', () => p.resolve(null))
    return p.promise
  }
  static promisify<T>(deferred: Deferred<T>) {
    return (err, data: T) => {
      if (err) { deferred.reject(err)}
      else { deferred.resolve(data) }
    }
  }
}
