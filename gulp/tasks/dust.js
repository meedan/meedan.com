var gulp = require('gulp');
var dust = require('gulp-dust');
var browserSync = require('browser-sync'); 
var config = require('../config');
var handleErrors = require('../util/handleErrors');



gulp.task('dust_index', function () {

    return gulp.src(config.dust.src + 'index.dust.html')
        .pipe(dust(config.dust.config))
	.on('error', handleErrors)
        .pipe(gulp.dest('dist'));
	.pipe(browserSync.reload({
	    stream: true,
	    notify: false
	}));
});	
