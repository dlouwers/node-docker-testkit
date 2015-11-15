import Orchestrator from './Orchestrator'
const Docker = require('dockerode')

export default class DockerTestKit {
  static docker = new Docker()
  static createOrchestrator(): Orchestrator {
    return new Orchestrator(DockerTestKit.docker)
  }
}
