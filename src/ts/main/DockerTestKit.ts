"use strict"
import Orchestrator from './Orchestrator'
const Docker = require('dockerode')

export default class DockerTestKit {
  static docker = new Docker()
  static createOrchestrator(): Orchestrator {
    return new Orchestrator(DockerTestKit.docker)
  }
  static getDockerHost(env: any = process.env): string {
    var dockerHost = env.DOCKER_HOST
    if (dockerHost) {
      var [protocol, host] = dockerHost.split('://')
      if (protocol === 'tcp') {
        return host
      }
    }
    return 'localhost'
  }
}
