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
var rename = require("gulp-rename");
var parallel = require('concurrent-transform');
var changed = require('gulp-changed');

// Example of rename via string
// gulp.src("./src/main/text/hello.txt")
//   .pipe(rename("main/text/ciao/goodbye.md"))
//   .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/goodbye.md

// Carry over misc files,
// but only if they changed.
gulp.task('misc-files', function () {
  gulp.src(['src/CNAME', 'src/*.js', 'src/*.pdf', 'src/robots.txt'])
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

// Image minification
gulp.task('image-compress', function () {
  return gulp.src(['src/images/*', 'src/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('www/images'));
});

gulp.task('image-resize', function () {
  gulp.src(['src/images/logos/*{.png,.jpg}','src/images/team/*{.png,.jpg}'])
  .pipe(imageResize({
    width : 200,
    upscale: false,
    imageMagick: true
    }))
  .pipe(gulp.dest('www/images/2x'));
});

// gulp.task('image-resize', function () {
//   gulp.src(['src/images/banners/*'])
//   .pipe(imageResize({ width : 2000 }))
//   .pipe(gulp.dest('www/images/2x'));
// });


// Dust template rendering
gulp.task('dust', function (cb) {
  return gulp.src(['src/*.dust', '!src/_*.dust']).pipe(
      dusthtml(dustConfig))
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
    .pipe(autoprefixer("last 4 versions", "> 1%", "ie 8", "ie 7"))
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

// Default task
gulp.task('default', function () {
  gulp.watch(scssFiles, ['sass']);
  gulp.watch('src/*.dust', ['dustreload']);
  browserSync(browserSyncConfig);
});

// Sass only
gulp.task('watch-sass', function () {
  gulp.watch(scssFiles, ['sass']);
  // TODO: make this stream
  browserSync(browserSyncConfig);
});
