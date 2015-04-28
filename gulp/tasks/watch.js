var gulp = require('gulp');
var markupConfig = require('../config').markup;
var sassConfig = require('../config').sass;

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(sassConfig.src, ['sass']);
  // gulp.watch(config.images.src, ['images']);
  gulp.watch(markupConfig.settings.basePath, ['markup']);
  console.log(markupConfig.settings.basePath);
});
