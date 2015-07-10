var localhostURL = "localhost:3002";
var defaultCheckdeskPage = /checkdesk-en/;

// Sanity
// 
casper.test.begin('home page loads', 1, function suite(test) {
  casper.start(localhostURL, function () {
    // Not sure why this one doesn't work yet.
    // test.assertUrlMatch(defaultCheckdeskPage, "URL looks like the default language-specific page.");
  });
  casper.then(function () {
    test.assertExists('h1', "Homepage h1 exists.");
  });
  casper.run(function () {
    test.done();
  });
});

// Test redirection
// 
casper.test.begin('/checkdesk redirects to a default language-specific page', 2, function suite(test) {
  casper.start(localhostURL + "/checkdesk", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
      test.assertUrlMatch(defaultCheckdeskPage, "Redirected to the language-specific page (En).");
    });
  });
  casper.then(function () {
    test.assertExists('body.checkdesk', "Main checkdesk body class exists.");
  });
  casper.run(function () {
    test.done();
  });
});

// Test RTL element
// 
casper.test.begin('/checkdesk arabic has rtl', 1, function suite(test) {
  casper.start(localhostURL + "/checkdesk-ar/", function () {
    this.wait(1000, function () {
      this.echo("waited for 1 seconds");
      var dump = require('utils').dump;
      test.assertMatch(this.getElementAttribute('html', 'dir'), /^rtl$/i);
    });
  });

  casper.run(function () {
    test.done();
  });
});