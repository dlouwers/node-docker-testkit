const Docker = require('dockerode')
import * as Q from 'q'
import Util from './Util'
import Container from './Container'
import Image from './Image'

export default class Orchestrator {
  private docker
  constructor(docker) {
    this.docker = docker
  }
  createContainer(config: any): Q.Promise<Container> {
    const p = Q.defer<Container>()
    this.docker.createContainer(config, (err, container) => {
      if (err) p.reject(err)
      else p.resolve(new Container(container))
    })
    return p.promise
  }
  pullImageAndCreateContainer(config: any): Q.Promise<Container> {
    return this.pullImage(config.Image).then(() => {
      return this.createContainer(config)
    })
  }
  pullImage(name: string): Q.Promise<Image> {
    const p = Q.defer<Image>()
    this.docker.pull(name, (err, data) => {
      if (err) p.reject(err)
      else {
        Util.streamToPromise(data)
          .then(() => p.resolve(this.getImage(name)))
          .fail((err) => p.reject(err))
      }
    })
    return p.promise
  }
  getImage(name: string): Image {
    return new Image(this.docker.getImage(name))
  }
  withContainer<T>(config: any, f: (any) => Q.Promise<T>): Q.Promise<T> {
    return this.pullImageAndCreateContainer(config).then((container: Container) => {
      return container.start().then((data) => {
        return container.inspect().then((data) => {
          return f(data)
        })
      }).finally(() => {
          return container.stop().finally(() => {
            return container.remove()
          })
      })
    })
  }
}
