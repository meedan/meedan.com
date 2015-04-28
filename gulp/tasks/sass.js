var sass = require('gulp-sass');
var scssFiles = "src/sass/**/*.scss";
var cssCompileDir = "www/css";

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
