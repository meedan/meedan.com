var gulp         = require('gulp');
var dust         = require('gulp-dust');
dust.helpers     = require('dustjs-helpers').helpers;
var dusthtml     = require('gulp-dust-html');
var changed      = require('gulp-changed');
var markupConfig = require('../config').markup;
var browserSync  = require('browser-sync');

gulp.task('markup', function () {
  console.log(markupConfig.settings);
  console.log(markupConfig.dustFiles);
  return gulp.src(markupConfig.src)
    .pipe(dusthtml(markupConfig.settings))
    .pipe(gulp.dest(markupConfig.dest))
    .pipe(browserSync.reload({stream:true}));
});
