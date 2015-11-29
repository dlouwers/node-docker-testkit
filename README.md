This library will assist you in writing integration tests. Instead of having
to install all kinds of services on your development station or writing
low-fidelity fake data access code you can just specify a docker container,
a port to talk to and get testing. The library will take care of the rest!

```javascript
var DockerTestKit = require('docker-testkit');
var orchestrator = DockerTestKit.createOrchestrator();
var dockerHost = DockerTestKit.getDockerHost();

describe('My Redis module', function() {
  it('should read and write a key/value pair', function() {
    var config = { "Image": "redis:latest", "HostConfig": { "PublishAllPorts": true }};
    return orchestrator.withContainer(config, function(data) {
      var port = data.NetworkSettings.Ports["6379/tcp"][0].HostPort;
      var client = redis.createClient(port, host, dockerHost);
      // Do stuff
      client.quit();
    });
  });
});
```

Note that if you do not have Docker locally installed on a Linux host running
the code you will need to correctly setup your Docker environment variables.
For example, if you are running docker-machine:

    eval "$(docker-machine env dev)"
