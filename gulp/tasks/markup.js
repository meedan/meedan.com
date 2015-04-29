var gulp         = require('gulp');
var changed      = require('gulp-changed');
var markupConfig = require('../config').markup;
var browserSync  = require('browser-sync');
var debug        = require('gulp-debug');
var colors       = require('colors');
var handleErrors = require('../util/handleErrors');
var reload      = browserSync.reload;
var fileinclude = require('gulp-file-include');

gulp.task('markup', function () {
  return gulp.src(markupConfig.src)
    .pipe(changed(markupConfig.dest))
    .pipe(fileinclude({
      prefix: '§'
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(markupConfig.dest))
    .pipe(reload({stream:true}));
});
