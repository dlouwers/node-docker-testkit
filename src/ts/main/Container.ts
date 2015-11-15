import * as Q from 'q'

export default class Container {
  private container: any
  constructor(container: any) {
    this.container = container
  }
  remove(): Q.Promise<any> {
    const p = Q.defer()
    this.container.remove((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
  start(): Q.Promise<any> {
    const p = Q.defer()
    this.container.start((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
  inspect(): Q.Promise<any> {
    const p = Q.defer()
    this.container.inspect((err, data) => {
        if (err) p.reject(err)
        else p.resolve(data)
    });
    return p.promise
  }
}
