var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncConfig = require('../config').browserSync;

gulp.task('bs', function() {
  browserSync(browserSyncConfig);
});
