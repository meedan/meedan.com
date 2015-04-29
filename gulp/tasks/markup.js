var gulp         = require('gulp');
var dust         = require('gulp-dust');
dust.helpers     = require('dustjs-helpers').helpers;
var dusthtml     = require('gulp-dust-html');
var changed      = require('gulp-changed');
var markupConfig = require('../config').markup;
var browserSync  = require('browser-sync');
var debug        = require('gulp-debug');
var colors       = require('colors');
var handleErrors = require('../util/handleErrors');
var reload      = browserSync.reload;

gulp.task('markup', function () {
  return gulp.src(markupConfig.src)
    .pipe(debug({title: '------:'}))
    .pipe(dusthtml(markupConfig.settings))
    .pipe(gulp.dest(markupConfig.dest))
    .on('error', handleErrors)
    .pipe(reload({stream:true}));
});
