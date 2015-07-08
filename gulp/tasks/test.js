// Note that we don't use the gulp plugin for casper, see [this blog post]("http://macr.ae/article/gulp-casperjs.html").
// 
var spawn = require('child_process').spawn,
  gulp = require('gulp'),
  gutil = require('gulp-util');

gulp.task('test', function () {
  var tests = ['test.js'];

  var casperChild = spawn('casperjs', ['--engine=slimerjs', 'test'].concat(tests));

  casperChild.stdout.on('data', function (data) {
    gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
  });

  casperChild.on('close', function (code) {
    var success = code === 0; // Will be 1 in the event of failure

    // Do something with success here
  });
});