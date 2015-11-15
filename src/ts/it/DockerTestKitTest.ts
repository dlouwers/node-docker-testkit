import chai = require('chai')
import DockerTestKit from '../main/DockerTestKit'
import Orchestrator from '../main/Orchestrator'
const assert = chai.assert

describe('DockerTestKit', () => {
  it('should create an Orchestrator', () => {
      assert.ok(DockerTestKit.createOrchestrator() instanceof Orchestrator)
  })
})
