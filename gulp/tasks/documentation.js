var sassdoc = require('sassdoc');
var gulp = require('gulp');
var config = require('../config');

/// Generate documentation from the Sass stylesheets
/// Using the Sassdoc comment notation inside the stylesheets
gulp.task('documentation', function () {
  return gulp.src(['./src/sass/**/*.scss', './bower_components/meedan-style/**/*.scss'])
    .pipe(sassdoc(config.documentation.sassdocOptions));
});