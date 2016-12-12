module.exports = function (casperjs, ready) {
  // Hide dynamic sections to avoid unnecssary failures (eg. the Medium.com embeds)
  //
  var styles = document.createElement("style");
  var head = document.getElementsByTagName("head")[0];
  styles.innerHTML = '.medium-channels { display: none !important; }';
  head.appendChild(styles);
}
