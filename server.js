// just quick webserver to serve www (in production)

var express = require('express'),
    serveStatic = require('serve-static'),
    app = express();

// static assets first
app.use(serveStatic('build', { 'index': ['index.html'] }))

// 302 redirects check --> checkdesk
app.get('/checkdesk', function(req, res) {
	res.redirect(302, '/check')
});
app.get('/checkdesk/index.html', function(req, res) {
	res.redirect(302, '/check')
});
app.get('/en/checkdesk', function(req, res) {
	res.redirect(302, '/en/check')
});
app.get('/en/checkdesk/index.html', function(req, res) {
	res.redirect(302, '/en/check')
});
app.get('/ar/checkdesk', function(req, res) {
	res.redirect(302, '/ar/check')
});
app.get('/ar/checkdesk/index.html', function(req, res) {
	res.redirect(302, '/ar/check')
});


app.listen(process.env.SERVER_PORT || 8080)
console.log('Listening on :8080');