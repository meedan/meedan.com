var localhostURL = "http://localhost:8080";
var defaultHomePage = "/en/";
var defaultCheckPage = "/en/check/";
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
casper.test.begin('/check redirects to a default language-specific page', 2, function suite(test) {
  casper.start(localhostURL + "/check", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
      test.assertUrlMatch(defaultCheckPage, "Redirected to the language-specific page (En).");
    });
  });
  casper.then(function () {
    test.assertExists('body.check', "Main check body class exists.");
  });
  casper.run(function () {
    test.done();
  });
});

// Test redirection of legacy checkdesk path
//
casper.test.begin('/checkdesk redirects to a default language-specific page', 1, function suite(test) {
  casper.start(localhostURL + "/checkdesk", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
      test.assertUrlMatch(defaultCheckPage, "Redirected to default Check (En).");
    });
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
// Disabled temporarily until we localize this page again. See below test of expected functionality. 2017-4-21 CGB
//
// casper.test.begin('/check arabic has rtl', 1, function suite(test) {
//   casper.start(localhostURL + "/ar/check/", function () {
//     this.wait(1000, function () {
//       this.echo("waited for 1 seconds");
//       var dump = require('utils').dump;
//       test.assertMatch(this.getElementAttribute('body', 'dir'), /^rtl$/i);
//     });
//   });

//   casper.run(function () {
//     test.done();
//   });
// });

// Test (temporary) redirection of /ar check page to /en check page.
//
casper.test.begin('/ar/check redirects to /en/check', 2, function suite(test) {
  casper.start(localhostURL + "/ar/check", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
      test.assertUrlMatch(defaultCheckPage, "Redirected to the (En) Check.");
    });
  });
  casper.then(function () {
    test.assertExists('body.en_check_index', "Main check en body class exists.");
  });
  casper.run(function () {
    test.done();
  });
});

// Test (temporary) redirection of /ar check page to /en check page.
//
casper.test.begin('/ar/check redirects to /en/check', 2, function suite(test) {
  casper.start(localhostURL + "/ar/check", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
      test.assertUrlMatch(defaultCheckPage, "Redirected to the (En) Check.");
    });
  });
  casper.then(function () {
    test.assertExists('body.en_check_index', "Main check en body class exists.");
  });
  casper.run(function () {
    test.done();
  });
});

// Test date format on ToS and Privacy Policy pages
//
casper.test.begin('date format on Check Privacy Policy page', 2, function suite(test) {
  casper.start(localhostURL + "/en/check/check_privacy.html", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
    });
  });
  casper.then(function () {
    var regexp = /Last modified: ([a-zA-Z]+ [0-9]{2}, [0-9]{4})/;
    var content = this.getPageContent();
    test.assertMatch(content, regexp, 'Invalid date format for the "Last modified" header');
    var dateStr = content.match(regexp)[1];
    var date = new Date(dateStr);
    var dateIsValid = (date != 'Invalid Date');
    test.assert(dateIsValid, '"Last modified" date format');
  });
  casper.run(function () {
    test.done();
  });
});
casper.test.begin('date format on Check ToS page', 2, function suite(test) {
  casper.start(localhostURL + "/en/check/check_tos.html", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
    });
  });
  casper.then(function () {
    var regexp = /Last modified: ([a-zA-Z]+ [0-9]{2}, [0-9]{4})/;
    var content = this.getPageContent();
    test.assertMatch(content, regexp, 'Invalid date format for the "Last modified" header');
    var dateStr = content.match(regexp)[1];
    var date = new Date(dateStr);
    var dateIsValid = (date != 'Invalid Date');
    test.assert(dateIsValid, '"Last modified" date format');
  });
  casper.run(function () {
    test.done();
  });
});
casper.test.begin('date format on Bridge Privacy Policy page', 2, function suite(test) {
  casper.start(localhostURL + "/en/bridge/bridge_privacy.html", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
    });
  });
  casper.then(function () {
    var regexp = /Last modified: ([a-zA-Z]+ [0-9]{2}, [0-9]{4})/;
    var content = this.getPageContent();
    test.assertMatch(content, regexp, 'Invalid date format for the "Last modified" header');
    var dateStr = content.match(regexp)[1];
    var date = new Date(dateStr);
    var dateIsValid = (date != 'Invalid Date');
    test.assert(dateIsValid, '"Last modified" date format');
  });
  casper.run(function () {
    test.done();
  });
});
casper.test.begin('date format on Bridge ToS page', 2, function suite(test) {
  casper.start(localhostURL + "/en/bridge/bridge_tos.html", function () {
    this.wait(2000, function () {
      this.echo("waited for 2 seconds");
    });
  });
  casper.then(function () {
    var regexp = /Last modified: ([a-zA-Z]+ [0-9]{2}, [0-9]{4})/;
    var content = this.getPageContent();
    test.assertMatch(content, regexp, 'Invalid date format for the "Last modified" header');
    var dateStr = content.match(regexp)[1];
    var date = new Date(dateStr);
    var dateIsValid = (date != 'Invalid Date');
    test.assert(dateIsValid, '"Last modified" date format');
  });
  casper.run(function () {
    test.done();
  });
});
