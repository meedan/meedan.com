var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncConfig = require('../config').browserSync;

gulp.task('browserSync', function() {
  browserSync(browserSyncConfig);
});
