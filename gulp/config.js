var gulp = require('gulp');
var dest = "./www";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      baseDir: dest
    }
  },
  sass: {
    settings: {
      errLogToConsole: true,
      includePaths: ["bower_components"],
      outputStyle: "compressed"
    },
    src: src + "/sass/**/*.scss",
    dest: dest + "/css"
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    settings: {
      basePath: src + "/markup"
    },
    dest: dest,
    src: src + "/markup/*.dust"
  }
};
