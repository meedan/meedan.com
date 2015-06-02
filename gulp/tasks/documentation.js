var gulp = require('gulp');
var styledocco = require('gulp-styledocco');
var config = require('../config');

gulp.task('documentation', function () {
  gulp.src(config.documentation.src)
    .on('error', handleErrors)
    .pipe(styledocco({
      out: 'www/docs',
      name: 'Meedan Style',
      'no-minify': true
    }))
    .pipe(browserSync.reload({
      stream: true,
      notify: false
    }));
});