var gulp = require('gulp');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var dust = require('gulp-dust');
dust.helpers = require('dustjs-helpers').helpers;
var dusthtml = require('gulp-dust-html');
var imagemin = require('gulp-imagemin');
var pkg = require('./package.json');
var scssFiles = "src/sass/**/*.scss";
var cssCompileDir = "www/css";
var autoprefixer = require('gulp-autoprefixer');
var w3cjs = require('gulp-w3cjs');
var imageResize = require('gulp-image-resize');
var parallel = require('concurrent-transform');
var changed = require('gulp-changed');
var psi = require('psi');
var site = 'http://meedan.com'

// Carry over misc files,
// but only if they changed.
gulp.task('misc-files', function () {
  gulp.src(['src/CNAME', 'src/*.js', 'src/*.pdf', 'src/robots.txt', 'src/images/favicons/*'])
    .pipe(changed("./www"))
    .pipe(gulp.dest("./www"));
});

// HTML Validator
gulp.task('validate', function () {
  gulp.src('www/*.html')
    .pipe(w3cjs());
});

// Dust template config
var dustConfig = {
  basePath: 'src',
  whitespace: true,
  data: {
    pkg: pkg,
    banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' + (new Date()).toString()
  }
}

// Error Handling
var ehandler = function (err) {
  console.log('ehandler');
  console.log(err.message);
}

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
    width : 200,
    upscale: false,
    crop: false
  }))
  .pipe(gulp.dest('www/images/2x/team/'))
  .pipe(imageResize({
    width : 100,
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


// Dust template rendering
gulp.task('dust', function (cb) {
  return gulp.src(['src/*.dust', '!src/_*.dust'])
    .pipe(changed('www/'))
    .pipe(dusthtml(dustConfig))
    .on('error', cb)
    .pipe(gulp.dest('www/'));
});
// convenience task to call reload after the dust rendering
gulp.task('dustreload', ['dust'], function () {
  reload();
});

// Sass stylesheets
var sassConfig = {
  errLogToConsole: true,
  includePaths: ["bower_components"],
  outputStyle: "compressed"
}

gulp.task('sass', function () {
  return gulp.src(scssFiles)
    .pipe(sass(sassConfig))
    .pipe(autoprefixer("last 4 versions", "> 1%"))
    .pipe(gulp.dest(cssCompileDir))
    .pipe(reload({
      stream: true
    }))
});

// Browser-sync
var browserSyncConfig = {
  reloadDelay: 2000,
  notify: false,
  server: {
    baseDir: "./www",
  }
}

gulp.task('pagespeed-mobile', function () {
    return psi(site, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }, function (err, data) {
        console.log(data.score);
        console.log(data.pageStats);
    });
});

// Default task
gulp.task('default', ['misc-files'], function () {
  gulp.watch(scssFiles, ['sass']);
  gulp.watch('src/*.dust', ['dustreload']);
  browserSync(browserSyncConfig);
});

// Sass only
gulp.task('watch-sass', function () {
  gulp.watch(scssFiles, ['sass']);
  browserSync(browserSyncConfig);
});
