"use strict"
import {assert}  from 'chai'
import DockerTestKit from '../main/DockerTestKit'
import Orchestrator from '../main/Orchestrator'

describe('DockerTestKit', () => {
  it('should create an Orchestrator', () => {
    assert.ok(DockerTestKit.createOrchestrator() instanceof Orchestrator)
  })
  it('default to localhost when the DOCKER_HOST env variable is not set', () => {
    const env = {}
    assert.equal(DockerTestKit.getDockerHost(env), 'localhost')
  })
  it('default to localhost when the DOCKER_HOST env variable uses unix sockets', () => {
    const env = { "DOCKER_HOST": "unix:///var/run/docker.sock" }
    assert.equal(DockerTestKit.getDockerHost(env), 'localhost')
  })
  it('use the host when the DOCKER_HOST env variable uses tcp', () => {
    const env = { "DOCKER_HOST": "tcp://192.168.1.1:2345" }
    assert.equal(DockerTestKit.getDockerHost(env), '192.168.1.1')
  })
})
