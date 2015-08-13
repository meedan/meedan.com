var gulp = require('gulp');

gulp.task('move-fonts', function () {
  gulp.src('src/fonts/*.ttf')
    .pipe(gulp.dest('./www/fonts'))
});
