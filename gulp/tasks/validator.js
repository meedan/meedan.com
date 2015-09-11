var gulp = require('gulp');
var w3cjs = require('gulp-w3cjs');

// HTML Validator
gulp.task('validate', function () {
  gulp.src(['www/*.html', '!www/_*.html'])
    .on('error', handleErrors)
    .pipe(w3cjs());
});