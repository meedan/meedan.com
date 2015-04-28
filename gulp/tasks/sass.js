var gulp = require('gulp');
var sass = require('gulp-sass');

// Sass stylesheets
var sassConfig = {
  errLogToConsole: true,
  includePaths: ["bower_components"],
  outputStyle: "compressed"
}

gulp.task('sass', function () {
  return gulp.src("src/sass/**/*.scss")
    .pipe(sass(sassConfig))
    .pipe(autoprefixer("last 4 versions", "> 1%"))
    .pipe(gulp.dest("www/css"))
    .pipe(reload({
      stream: true
    }))
});
