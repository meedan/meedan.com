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
    .pipe(gulp.dest('source/images/'))
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

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {
  return gulp.src(['source/images/**/*', '!source/images/vector.svg'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('source/images/'));
});