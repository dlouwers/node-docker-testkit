import * as Q from 'q'
import Util from './Util'

export default class Image {
  private image: any
  constructor(image: any) {
    this.image = image
  }
  remove(): Q.Promise<any> {
    const p = Q.defer()
    this.image.remove(Util.promisify(p))
    return p.promise
  }
  history(): Q.Promise<any> {
    const p = Q.defer()
    this.image.history(Util.promisify(p))
    return p.promise
  }
  inspect(): Q.Promise<any> {
    const p = Q.defer()
    this.image.inspect(Util.promisify(p))
    return p.promise
  }
}
