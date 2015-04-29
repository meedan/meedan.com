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
    dest: dest + "/images",
    imagemin: {
      optimizationLevel: 7,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }
  },
  markup: {
    dest: dest,
    src: src + ["/markup/{*.html,!_*.html,*.md}"]
  }
};
