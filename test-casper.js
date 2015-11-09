var localhostURL = "http://localhost:4567";
var defaultHomePage = "/en/";
var defaultCheckdeskPage = "/en/checkdesk/";
var defaultBridgePage = "/en/bridge/";

// Sanity check
//
casper.test.begin('home page loads', 2, function suite(test) {
  casper.start(localhostURL, function () {
    test.assertUrlMatch(defaultHomePage, "URL looks like the default language-specific homepage.");
  });
  casper.then(function () {
    test.assertExists('.slogan', "Homepage h1 exists.");
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

// Test redirection
//
casper.test.begin('/bridge redirects to a default language-specific page', 2, function suite(test) {
  casper.start(localhostURL + "/bridge", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
      test.assertUrlMatch(defaultBridgePage, "Redirected to the language-specific page (En).");
    });
  });
  casper.then(function () {
    test.assertExists('body.bridge', "Main bridge body class exists.");
  });
  casper.run(function () {
    test.done();
  });
});


// Test RTL element
//
casper.test.begin('/checkdesk arabic has rtl', 1, function suite(test) {
  casper.start(localhostURL + "/ar/checkdesk/", function () {
    this.wait(1000, function () {
      this.echo("waited for 1 seconds");
      var dump = require('utils').dump;
      test.assertMatch(this.getElementAttribute('body', 'dir'), /^rtl$/i);
    });
  });

  casper.run(function () {
    test.done();
  });
});