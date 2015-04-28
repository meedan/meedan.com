var gulp = require('gulp');
var w3cjs = require('gulp-w3cjs');

// HTML Validator
gulp.task('validate', function () {
  gulp.src('www/*.html')
    .pipe(w3cjs());
});
