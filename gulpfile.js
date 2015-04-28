var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

// var pkg = require('package.json');

var requireDir = require('require-dir');
// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

// var parallel = require('concurrent-transform');
var site = 'http://meedan.com';
