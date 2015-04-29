var gulp = require('gulp');
var markupConfig = require('../config').markup;
var sassConfig = require('../config').sass;

gulp.task('watch', ['bs'], function() {
  gulp.watch(sassConfig.src, ['sass']);
  // gulp.watch(config.images.src, ['images']);
  gulp.watch(markupConfig.src, ['markup'])
});
