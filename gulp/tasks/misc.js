var gulp = require('gulp');
var changed = require('gulp-changed');

// Carry over misc files,
// but only if they changed.
gulp.task('misc-files', function () {
  gulp.src(['src/CNAME', 'src/*.js', 'src/*.pdf', 'src/robots.txt', 'src/images/favicons/*'])
    .pipe(changed("./www"))
    .pipe(gulp.dest("./www"));
});
