// just quick webserver to serve www

var http = require('http');
var ecstatic = require('ecstatic');
 
http.createServer(
  ecstatic({ root: __dirname + '/www' })
).listen(8080);
 
console.log('Listening on :8080');
