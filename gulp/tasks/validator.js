// HTML Validator
gulp.task('validate', function () {
  gulp.src('www/*.html')
    .pipe(w3cjs());
});
