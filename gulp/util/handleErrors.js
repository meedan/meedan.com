var notify = require("gulp-notify");

module.exports = function () {

  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    // message: "<%= error %>" // This breaks the notification in OSX — CGB
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};