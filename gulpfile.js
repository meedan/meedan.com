var gulp = require('gulp');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var pkg = require('./package.json');
var autoprefixer = require('gulp-autoprefixer');
var w3cjs = require('gulp-w3cjs');

// var parallel = require('concurrent-transform');
var changed = require('gulp-changed');
var psi = require('psi');
var site = 'http://meedan.com';

// Carry over misc files,
// but only if they changed.
gulp.task('misc-files', function () {
  gulp.src(['src/CNAME', 'src/*.js', 'src/*.pdf', 'src/robots.txt', 'src/images/favicons/*'])
    .pipe(changed("./www"))
    .pipe(gulp.dest("./www"));
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
