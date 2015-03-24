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

// Error Handling
var ehandler = function (err) {
  console.log('ehandler');
  console.log(err.message);
}

// Dust templates
var dustConfig = {
  basePath: 'src',
  whitespace: true,
  data: {
    pkg: pkg,
    banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' + (new Date()).toString()
  }
}

// Image minification
gulp.task('images', function () {
  return gulp.src(['src/images/*', 'src/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('www/images'));
});

gulp.task('dust', function (cb) {
  return gulp.src(['src/*.dust', '!src/_*.dust']).pipe(
      dusthtml(dustConfig))
    .on('error', cb)
    .pipe(gulp.dest('www/'));
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
  gulp.watch('src/*.dust', ['dust']).on('change', reload);
  browserSync(browserSyncConfig);
});
