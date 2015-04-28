var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Browser-sync
var browserSyncConfig = {
  reloadDelay: 2000,
  notify: false,
  server: {
    baseDir: "./www",
  }
}
