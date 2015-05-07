var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var config = require('../config');
var parallel = require("concurrent-transform");
var os = require("os");

gulp.task('resize-logos', function () {
  // SVG files get special handling
  gulp.src('src/images/**/*.svg')
    .pipe(gulp.dest("./www/images/vector/"))

  // Then make the 2x
  gulp.src(['src/images/logos/*{.png,.jpg}'])
    .pipe(parallel(
      imageResize({
        width: 600
      })))
    .pipe(gulp.dest('www/images/2x/logos/'))

  // Then the 1x
  .pipe(parallel(
    imageResize({
      width: 300
    })))
    .pipe(gulp.dest('www/images/1x/logos/'));
});

gulp.task('resize-team', function () {
  gulp.src(['src/images/team/*{.png,.jpg}'])
    .pipe(parallel(
      imageResize({
        width: 400
      })))
    .pipe(gulp.dest('www/images/2x/team/'))
    .pipe(parallel(
      imageResize({
        width: 200
      })))
    .pipe(gulp.dest('www/images/1x/team/'));
});

gulp.task('resize-banners', function () {
  gulp.src(['src/images/banners/*{.png,.jpg}'])
    .pipe(parallel(
      imageResize({
        width: 2000
      })))
    .pipe(gulp.dest('www/images/2x/banners/'))
    .pipe(parallel(
      imageResize({
        width: 1000
      })))
    .pipe(gulp.dest('www/images/1x/banners/'));
});


gulp.task('resize-screenshots', function () {
  gulp.src(['src/images/screenshots/*{.png,.jpg}'])
    .pipe(parallel(
      imageResize({
        width: 1050
      })))
    .pipe(gulp.dest('www/images/2x/screenshots/'))
    .pipe(parallel(
      imageResize({
        width: 525
      })))
    .pipe(gulp.dest('www/images/1x/screenshots/'));
});

// Summary resize-images tasks
gulp.task('resize-images', ['resize-team', 'resize-banners', 'resize-logos', 'resize-screenshots']);
gulp.task('images', ['resize-images']);