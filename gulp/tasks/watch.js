var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', ['bs'], function() {
  gulp.watch(config.misc.src,   ['misc']);
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.markup.src, ['markup']);
});
