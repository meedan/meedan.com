var gulp = require('gulp');
var dust = require('gulp-dust');
dust.helpers = require('dustjs-helpers').helpers;
var dusthtml = require('gulp-dust-html');
var markupConfig = require('../config').markup;

// Dust template rendering
gulp.task('markup', function (cb) {
  return gulp.src(['src/*.dust', '!src/_*.dust'])
    .pipe(changed('www/'))
    .pipe(dusthtml(markupConfig))
    .on('error', cb)
    .pipe(gulp.dest('www/'));
});
