var gulp = require('gulp');
var browserSync = require('browser-sync');
var styledocco = require('gulp-styledocco');
var config = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('documentation', function () {
  gulp.src(config.documentation.src)
    .on('error', handleErrors)
    .pipe(styledocco({
      'out': config.documentation.dest,
      'name': 'Meedan Style',
      'no-minify': true
    }))
    .on('error', handleErrors)
    .pipe(browserSync.reload({
      stream: true
    }))
    .on('error', handleErrors)
});