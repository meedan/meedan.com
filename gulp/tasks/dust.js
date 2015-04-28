var dust = require('gulp-dust');
dust.helpers = require('dustjs-helpers').helpers;
var dusthtml = require('gulp-dust-html');

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
