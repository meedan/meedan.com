var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('watch', ['bs'], function () {
  gulp.watch(config.misc.src, ['misc']);
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.documentation.src, ['documentation']);
});