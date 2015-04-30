var gulp    = require('gulp');
var changed = require('gulp-changed');
var config  = require('../config');

gulp.task('misc', function () {
  gulp.src(config.misc.src)
    .pipe(changed(config.misc.dest))
    .pipe(gulp.dest(config.misc.dest));
});
