var gulp = require('gulp');
var dust = require('gulp-dust');
var browserSync = require('browser-sync');
var config = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('dust', function () {
  return gulp.src(config.dust.src)
    .pipe(dust(config.dust.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dust.dest))
    .pipe(browserSync.reload({
      stream: true,
      notify: false
    }));
});