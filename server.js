// just quick webserver to serve www (in production)

var express = require('express'), serveStatic = require('serve-static'), app = express();

bridgePages = [
'/bridge/',
'/bridge/index.html'
];

checkEnglishPages = [
  '/checkdesk',
  '/checkdesk/index.html',
  '/checkdesk-en', // A bad URL on some press coverage http://www.niemanlab.org/2015/08/tweeting-across-borders-with-a-new-mobile-app-meedan-is-working-to-improve-social-media-translation/
  '/check',
  '/check/index.html',
  '/en/checkdesk',
  '/en/checkdesk/index.html',
  '/ar/check', // Redirect Arabic to English temporarily 2017-4-20 CGB
  '/ar/check/index.html',
];

// Redirect to canonical Bridge page
app.get(bridgePages, function(req, res) {
  res.redirect(302, '/en/bridge');
});

// Redirect to canonical Check page
app.get(checkEnglishPages, function(req, res) {
  res.redirect(302, '/en/check');
});

// Redirect to canonical credibility indicators page
app.get(['/ciwg', '/en/credibility-indicators'], function(req, res) {
  res.redirect(302, '/credibility-indicators');
});
// Uncomment once localized 2017-4-20 CGB
//
// Redirect to the canonical Arabic Check page
//
// app.get('/ar/checkdesk', function(req, res) {
//  res.redirect(302, '/ar/check')
// });
// app.get('/ar/checkdesk/index.html', function(req, res) {
//  res.redirect(302, '/ar/check')
// });

// static assets first
app.use(serveStatic('build', {index: ['index.html']}));

app.listen(process.env.SERVER_PORT || 8080).on('error', function(e) {
  if (e.code == "EADDRINUSE") {
    console.log("WARN: Port is already in use and the server was not restarted ... proceeding anyway.");
  }
});

console.log('Listening on :8080');
