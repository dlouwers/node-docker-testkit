import * as Q from 'q'
import Util from './Util'

export default class Image {
  private image: any
  constructor(image: any) {
    this.image = image
  }
  remove(): Q.Promise<any> {
    const p = Q.defer()
    this.image.remove((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
  history(): Q.Promise<any> {
    const p = Q.defer()
    this.image.history((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
  inspect(): Q.Promise<any> {
    const p = Q.defer()
    this.image.inspect((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
}
