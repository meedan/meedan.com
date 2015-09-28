var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var psi = require('psi');
var site = "http://meedan.com";
var w3cjs = require('gulp-w3cjs');
var notify = require("gulp-notify");

handleErrors = function () {

  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('bundle-svg', function () {
  // SVG files get special handling
  gulp.src('source/images/vector/*.svg')
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest('source/images/vector/'))
});

gulp.task('pagespeed', function () {
  return psi(site, {
    nokey: 'true',
    strategy: 'mobile',
  }, function (err, data) {
    console.log(data.score);
    console.log(data.pageStats);
  });
});

// HTML Validator
gulp.task('validate', function () {
  gulp.src(['build/*.html', '!build/_*.html'])
    .on('error', handleErrors)
    .pipe(w3cjs());
});