var gulp = require('gulp');
var psi = require('psi');
var site = "http://meedan.com";

gulp.task('pagespeed', function () {
  return psi(site, {
    nokey: 'true',
    strategy: 'mobile',
  }, function (err, data) {
    console.log(data.score);
    console.log(data.pageStats);
  });
});