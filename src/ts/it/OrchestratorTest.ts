import {assert}  from 'chai'
import DockerTestKit from '../main/DockerTestKit'
import Orchestrator from '../main/Orchestrator'

describe('Orchestrator', function() {
  this.timeout(60000)
  const subject: Orchestrator = DockerTestKit.createOrchestrator()

  it('should pull a container and remove it', () => {
    return subject.pullImage('busybox').then((image) => {
      return image.remove()
    })
  })

  it('should return an error creating a container from an image that is not available', () =>{
    return subject.createContainer({Image: 'bogus123'}).fail((err) => {
      assert.equal(err.statusCode, 404)
    })
  })

  it('should pull the image creating a container from an image that is not available', () => {
    return subject.pullImageAndCreateContainer({ Image: 'busybox' }).then((container) => {
      return container.remove().then(() => {
        return subject.getImage('busybox').remove().then(() => {
          return null;
        })
      })
    })
  })
})
