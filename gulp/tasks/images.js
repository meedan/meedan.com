var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');

gulp.task('resize-logos', function () {
  // SVG files get special handling
  gulp.src('src/images/**/*.svg')
  .pipe(gulp.dest("./www/images/vector/"))

  // Then make the 2x
  gulp.src(['src/images/logos/*{.png,.jpg}'])
  .pipe(imageResize({
    width : 200,
    upscale: false,
    crop: false
  }))
  .pipe(gulp.dest('www/images/2x/logos/'))

  // Then the 1x
  .pipe(imageResize({
    width : 100,
    upscale: false,
    crop: false
  }))
  .pipe(gulp.dest('www/images/1x/logos/'));
});

gulp.task('resize-team', function () {
  gulp.src(['src/images/team/*{.png,.jpg}'])
  .pipe(imageResize({
    width : 400,
    upscale: false,
    crop: false
  }))
  .pipe(gulp.dest('www/images/2x/team/'))
  .pipe(imageResize({
    width : 200,
    upscale: false,
    crop: false
  }))
  .pipe(gulp.dest('www/images/1x/team/'));
});

gulp.task('resize-banners', function () {
  gulp.src(['src/images/banners/*{.png,.jpg}'])
  .pipe(imageResize({
    width : 2000,
    upscale: false,
    crop: false
  }))
  .pipe(gulp.dest('www/images/2x/banners/'))
  .pipe(imageResize({
    width : 1000,
    upscale: false,
    crop: false
  }))
  .pipe(gulp.dest('www/images/1x/banners/'));
});

// Summary resize-images tasks
gulp.task('resize-images', ['resize-team', 'resize-banners', 'resize-logos']);
gulp.task('images', ['resize-images', 'image-compress']);

// Image minification, after resizing
gulp.task('image-compress', function () {
  return gulp.src(['www/images/*', 'www/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('www/images'));
});
