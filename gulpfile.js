var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var psi = require('psi');
var site = "http://meedan.com";
var notify = require("gulp-notify");

// Send error to notification center with gulp-notify
handleErrors = function () {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
  }).apply(this, args);
  this.emit('end');
};

// SVG files get special handling
gulp.task('bundle-svg', function () {
  gulp.src('source/images/vector/*.svg')
    .pipe(svgmin({
      plugins: [{
        removeDoctype: true
      }, {
        removeComments: true
      }]
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(gulp.dest('source/images/vector/'))
});

// Check our pagespeed score (in production)
gulp.task('pagespeed', function () {
  return psi(site, {
    nokey: 'true',
    strategy: 'mobile',
  }, function (err, data) {
    console.log(data.score);
    console.log(data.pageStats);
  });
});