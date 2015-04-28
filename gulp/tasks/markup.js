var gulp = require('gulp');
var dust = require('gulp-dust');
dust.helpers = require('dustjs-helpers').helpers;
var dusthtml = require('gulp-dust-html');
var changed = require('gulp-changed');
var markupConfig = require('../config').markup;
var config = require('../config');
var browserSync  = require('browser-sync');
var dustFiles =
  [
    markupConfig.settings.basePath + '/*.dust',
    markupConfig.settings.basePath + '/!src/_*.dust'
  ];

gulp.task('markup', function () {
  console.log(markupConfig.settings);
  return gulp.src("src/markup/**/*.dust")
    .pipe(changed(markupConfig.dest))
    .pipe(dusthtml(markupConfig.settings))
    .pipe(gulp.dest(markupConfig.dest))
    .pipe(browserSync.reload({stream:true}));
});
