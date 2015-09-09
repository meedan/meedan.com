var gulp = require('gulp');
var w3cjs = require('gulp-w3cjs');
// var gutil = require('gulp-util');

// HTML Validator
gulp.task('validate', function () {
  gulp.src(['www/*.html', '!www/_*.html'])
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(w3cjs());
});