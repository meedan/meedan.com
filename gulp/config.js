var dest = "./www";
var src = './src';

module.exports = {
  misc: {
    src: src + '/{CNAME, *.js, *.pdf, images/favicons/*, robots.txt}',
    dest: dest
  },
  browserSync: {
    server: {
      baseDir: dest,
    },
    notify: false,
    ghostMode: false,
    browser: ["google chrome"],
    port: 3333
  },
  sass: {
    settings: {
      errLogToConsole: true,
      includePaths: ['bower_components'],
      outputStyle: "compressed"
    },
    src: src + "/sass/**/*.scss",
    dest: dest + "/css"
  },
  images: {
    src: [src + "/images/**/*", src + "/images/*"],
    dest: dest + "/images"
  },

  markup: {
    dest: dest,
    src: [src + "/markup/*.html", src + "/markup/**/*.html"]
  },

  fonts: {
    src: [src + "/fonts/**/*", src + "/fonts/*"],
    dest: dest + "/fonts"
  },

  tests: {
    dest: dest,
    src: ["test.js"]
  }
};
