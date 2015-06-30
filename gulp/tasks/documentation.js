var sassdoc = require('sassdoc');
var gulp = require('gulp');
var config = require('../config');
var pageres = require('pageres');

var pageres = new pageres({
    delay: 2
  })
  .src('meedan.com', ['480x320', '1024x768', 'iphone 5s'], {
    crop: true
  })
  .src('meedan.com/checkdesk-en', ['1280x1024', '1920x1080'])
  .dest('docs/screenshots');

gulp.task('documentation', function () {
  pageres.run(function (err) {
    console.log('Done screenshotting ...');
  });

  return gulp.src(config.sass.src)
    .pipe(sassdoc(config.documentation.sassdocOptions));
});