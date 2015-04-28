var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config = require('../config').browserSync;

gulp.task('browserSync', function() {
  browserSync(config);
});
