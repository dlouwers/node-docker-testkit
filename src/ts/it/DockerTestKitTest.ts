import {assert}  from 'chai'
import DockerTestKit from '../main/DockerTestKit'
import Orchestrator from '../main/Orchestrator'

describe('DockerTestKit', () => {
  it('should create an Orchestrator', () => {
    assert.ok(DockerTestKit.createOrchestrator() instanceof Orchestrator)
  })
})
