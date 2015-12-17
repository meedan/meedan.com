# This is a build system for [meedan.com](http://meedan.com)

This is an environment for fast, synchronized browser refreshing as you edit Sass, HTML and Javascript.

## Overview

0. Install the npm and node and ruby 2.x
1. `make` — This will run the make file to install the build system (local and global npm modules, and ruby gems).
2. `npm start` — this will run middleman with bundler.
3. Edit .scss, .html and .js files. The browser should live-reload.

## [Middleman](http://middlemanapp.com/) setup

[Middleman](http://middlemanapp.com/) compiles our static site `build` from files in `source`.

To start compiling Sass and HTML, install the site dependencies, then execute middleman in the top level: `bundle exec middleman`.

Middleman is a rubyish (sinatraish) and markdownish templating & routing system. It's a little sluggish.

To run middleman directly without the `npm start` shortcut, do `bundle exec middleman --verbose`.

## Gulp Tasks

We use gulp for a few utilities.

Eventually we'll proably port these into simpler `npm` scripts defined in `package.json` but for now they're still gulp.

These are our gulp tasks (run `gulp -T` to see the latest).
- bundle-svg — bundle all of the svg files into a single file we can inline into the template.
- pagespeed — run an optimization test based on google pagespeed insights API. Note: This operates on the live site, not the local site. (To test the local site you can use ngrok and reconfigure the URL in gulpfile.js.)
- validate - check `./build/*.html` for validity

## Installing dependencies

The code we use is packaged with [Rubygems](http://rubygems.com/) and [NPM](https://www.npmjs.com/ "npm"). To get the build environment in place, run this in your terminal in the top level of this directory: `make setup`. This will hopefully:

  * install the `gulp` build tool
  * install `bundler` and use bundler to install ruby gems listed in the `Gemfile`.
  * install the `bower` package manager (bower is like npm or bundler)
  * `npm install` the libs listed in `package.json` 
  * `bower install` the libs listed in `bower.json`

To see what's installed, read the `./Makefile`.

## Local development of meedan.com

*:warning: Don't edit the files in `./build`*

To work on the HTML and Sass, edit the files in `./source` while `gulp` runs.

`gulp`, a nodejs base task runner, watches files in `./source` and automatically updates `./build` when files in `./source` are saved. 

Once you've done the `npm install` step, you should be able to run: `gulp`.

That will start the compiler for both the stylesheets ([Sass](sass-lang.com/)) and the HTML ([dust](http://akdubya.github.io/dustjs/ "dust") templates). It also starts a nifty tool called [browser-sync](http://www.browsersync.io/) which should automatically update your browser when there are changes.

While the gulp compiler is running, edit the source files in `source/` and the web-ready files in `www` will be regenerated.

## Working with SVG 

SVG files are joined by the `gulp-svgmin` task into one big SVG file. See [gulp/tasks/images.js]. Then we access those with markup like this: `<svg><use xlink:href="#kf" /></svg>`. The #kf corresponds to the file `images/logos/kf.svg`. Each file name needs to be unique for this reason. (Note — Unfortunately it seems SVG referenced in this way can not be styled by external CSS. The main purpose of combining the files is just to reduce the number of HTTP requests.)

## Releasing new versions

Use `git tag` and `git commit` in the [SemVer](http://semver.org/) style.

When you push an update, try this bower command: `bower version 0.0.1`. (Use `git tag` to see previous tags.)

## Deploying meedan.com

To deploy the files from the www directory to the gh-pages branch first tag a release like `bower version 2.2.15`. Then use jenkins to deploy.

When the repo gets updated on github, an automatic build and deployment of meedan-com.dev.meedan.com is triggered

## Sass

- The starting points is screen.scss. That `@imports` everything else.
- We first apply [John Albin's Sass port](https://github.com/JohnAlbin/normalize-scss) of [Necolas Gallagher's normalize](https://github.com/necolas/normalize.css).
- Then we import sass components from meedan-style — these are shared by various Meedan projects. They live in their own [public version-controlled repository](github.com/meedan/meedan-style). Any style in meedan-style is available to all Meedan projects. Only our best, most reusable work goes in this section. 
- Each of the components is documented with [SassDoc](https://github.com/SassDoc/sassdoc). 

## Running tests

There are integration tests operated by [casperjs](http://casperjs.org/ "CasperJS, a navigation scripting and testing utility for PhantomJS and SlimerJS").  

Note that we use slimerjs instead of phantomjs (for better redirection support as of July 2015).

To run the tests make sure you:

- install standalone global casper and slimerjs executables, for example on a mac with homebrew: `brew install casperjs slimerjs`
- run the tests with `npm test`