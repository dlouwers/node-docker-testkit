'use strict'
const Docker = require('dockerode')
import { Promise, defer } from 'q'
import Util from './Util'
import Container from './Container'
import Image from './Image'

export default class Orchestrator {

  private docker

  constructor(docker) {
    this.docker = docker
  }

  createContainer(config: any): Promise<Container> {
    const p = defer<Container>()
    this.docker.createContainer(config, Util.callbackToPromise(p))
    return p.promise.then(container => new Container(container))
  }

  pullImageAndCreateContainer(config: any): Promise<Container> {
    return this.pullImage(config.Image).then(() => {
      return this.createContainer(config)
    })
  }

  pullImage(name: string): Promise<Image> {
    const p = defer<Image>()
    this.docker.pull(name, Util.callbackToPromise(p))
    return p.promise.then(Util.streamToPromise).then(() => this.getImage(name))
  }

  getImage(name: string): Image {
    return new Image(this.docker.getImage(name))
  }

  withContainer<T>(config: any, f: (any) => Promise<T>): Promise<T> {
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
