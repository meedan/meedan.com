// just quick webserver to serve www (in production)

var http = require('http');
var ecstatic = require('ecstatic');

http.createServer(
  ecstatic({
    root: __dirname + '/build'
  })
).listen(8080);

console.log('Listening on :8080');