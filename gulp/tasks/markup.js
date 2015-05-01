var gulp         = require('gulp');
var notify       = require('gulp-notify');
var changed      = require('gulp-changed');
var config       = require('../config');
var browserSync  = require('browser-sync') ;
var debug        = require('gulp-debug');
var colors       = require('colors');
var handleErrors = require('../util/handleErrors');
var fileinclude  = require('gulp-file-include');

gulp.task('markup', function () {
  return gulp.src(config.markup.src)
    .pipe(debug(config.markup.src))
    .pipe(changed(config.markup.dest))
    .pipe(fileinclude({ prefix: '§'}))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.markup.dest))
    .pipe(browserSync.reload({stream:true}));
});
