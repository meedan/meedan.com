var dest = "./www";
var src = './src';

module.exports = {
  misc: {
    src: src + '/{CNAME, *.js, *.pdf, images/favicons/*, robots.txt}',
    dest: dest
  },
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
      optimizationLevel: 6,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }
  },
  markup: {
    dest: dest,
    src: ["./src/markup/*.html"]
  }
};
