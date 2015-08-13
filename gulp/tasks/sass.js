var gulp = require('gulp');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('sass', function () {
  return gulp.src(config.sass.src)
    .pipe(sass(config.sass.settings))
    .on('error', browserSync.notify)
    .pipe(autoprefixer("last 4 versions", "> 1%"))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({
      stream: true,
      notify: false
    }));
});