"use strict"
import * as Q from 'q'

export default class Util {
  static streamToPromise(stream: any): Q.Promise<any> {
    const p = Q.defer()
    stream.setEncoding('utf8')
    stream.on('data', (d) => null)
    stream.on('error', (err) => p.reject(err))
    stream.on('end', () => p.resolve(null))
    return p.promise
  }
  static promisify<T>(deferred: Q.Deferred<T>) {
    return (err, data: T) => {
      if (err) { deferred.reject(err)}
      else { deferred.resolve(data) }
    }
  }
}
