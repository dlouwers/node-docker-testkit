'use strict'
import Orchestrator from './Orchestrator'
const Docker = require('dockerode')

export default class DockerTestKit {

  static docker = new Docker()

  static createOrchestrator(): Orchestrator {
    return new Orchestrator(DockerTestKit.docker)
  }

  static getDockerHost(env: any = process.env): string {
    const dockerHost = env.DOCKER_HOST
    if (dockerHost) {
      const [protocol, rest] = dockerHost.split('://')
      if (protocol === 'tcp') {
        const [host, port] = rest.split(':') 
        return host
      }
    }
    return 'localhost'
  }
}
