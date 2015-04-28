var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var requireDir = require('require-dir');
// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

// var parallel = require('concurrent-transform');
var changed = require('gulp-changed');

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
  gulp.watch("src/sass/**/*.scss", ['sass']);
  gulp.watch('src/*.dust', ['dustreload']);
  browserSync(browserSyncConfig);
});

// Sass only
gulp.task('watch-sass', function () {
  gulp.watch("src/sass/**/*.scss", ['sass']);
  browserSync(browserSyncConfig);
});
