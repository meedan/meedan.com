var gulp          = require('gulp');
var rename        = require("gulp-rename");
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var jshint        = require('gulp-jshint');
var nodemon       = require('gulp-nodemon');
var sass          = require('gulp-sass');
var bowerDir      = "bower_components";

var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

var dust          = require('gulp-dust');
dust.helpers      = require('dustjs-helpers').helpers;
var dusthtml      = require('gulp-dust-html');

var pkg           = require('./package.json');
var config        = require('./config/config.js');

//
// DUST
//
gulp.task('dustindex', function(cb) {
    return gulp.src('src/index.dust.html').pipe(
        dusthtml({
            basePath : 'src/dust',
            whitespace : true,
            data : {
                pkg : pkg,
                config : config,
                banner : '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' + (new Date()).toString()
            }
        }))
        .on('error', cb)
        .pipe(rename('index.html'))
        .pipe(gulp.dest('www/'));
});

// templates
gulp.task('dust', function () {
    return gulp.src('src/dust/*.html')
        .pipe(dust())
	.on('error', ehandler)
        .pipe(gulp.dest('src/dust/compiled'));
});

//
// nodemon
//

gulp.task('nodemon', function() {
    nodemon({
	script: 'server.js'
	, ext: 'js json'
	, env: { 'NODE_ENV': 'development' }
    }
	   ).on('restart', 'lint')
});

// BROWSER SYNC
//
var browserSyncConfig = {
    reloadDelay: 2000,
    server: {
        baseDir: "./www"
    }
}

// Static server
gulp.task('browser-sync', function() {
    browserSync(browserSyncConfig);
});

// Reload all Browsers
gulp.task('bs-reload', ['uglify','sass'], function () {
    browserSync.reload();
});

//
// JS 
//

// uglify
gulp.task('uglify',['dust','dustindex'], function() {
    return gulp.src([
        'node_modules/dustjs-linkedin/dist/dust-core.js',
	    'node_modules/dustjs-helpers/dist/dust-helpers.min.js',
	    'node_modules/crossroads/node_modules/signals/dist/signals.js',
	    'node_modules/hasher/dist/js/hasher.js',
        'node_modules/crossroads/dist/crossroads.js',
        'bower_components/lodash/lodash.js',
        'node_modules/async/lib/async.js',
        'src/dust/compiled/*.js',
        'src/js/lib/*.js',
        'src/js/*.js'
    ])
	.pipe(concat('all.js'))
//	.pipe(uglify())
	.on('error', ehandler)
	.pipe(rename(pkg.name + '.min.js'))
	.pipe(gulp.dest('www/js/'))
});

// lint
gulp.task('lint', function() {
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.on('error', ehandler)
});

// SASS
//
var scssFiles     = "src/sass/**/*.scss";
var cssCompileDir = "www/css";
gulp.task('sass', function () {
  return gulp.src(scssFiles)
    .pipe(sass({
        includePaths: [bowerDir], 
        outputStyle: "compressed"
    }))
    .pipe(gulp.dest(cssCompileDir))
//    .pipe(reload({stream:true}))
    .on('error', ehandler);
});


// WATCH EVERYTHING
//
gulp.task('watch', ['browser-sync'], function () {
    var watcher = gulp.watch(
        ['src/**/*', 'src/*', '!src/dust/compiled/*', '!.#*'], 
        ['lint','dustindex','dust','sass','uglify','bs-reload']
    );

    watcher.on('change', function(event) {
    	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//    	console.log(event);
    	reload;
    });
});

// WATCH SASS
gulp.task('watch-sass', ['sass', 'browser-sync'], function () {
    gulp.watch(scssFiles, ['sass']);
});

// DEFAULT
gulp.task('default', ['watch']);

// ERROR HANDLING
var ehandler = function(err) { 
    console.log('ehandler'); 
    console.log(err.message); 
}