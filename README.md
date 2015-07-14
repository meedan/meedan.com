# This is a build system for [meedan.com](http://meedan.com)

This is an environment for fast, synchronized browser refreshing as you edit Sass, HTML and Javascript.

## Overview

0. Install the npm and node
1. Run the make file to install the build system (local and global npm modules)
2. Run the default `gulp` task
3. Edit .scss, .html and .js files

## Our Tasks

These are our gulp tasks (run `gulp -T` to see the latest).

- documentation — builds the `./www/docs` from inline source comments in `./src/sass/`
- images — resize several types of images in several ways from `./src/images/`
- markup — render valid HTML markup from our templates from `./src/markup/`
- misc — carry over some random files that don't fit elsewhere `./src/{misc}`
- pagespeed — run a tough optimization test
- sass — parse Sass into CSS, from `./src/sass` to `./www/css`
- validate - check `./www/*.html` for validity
- watch — do the things above _if the `src` files change

Each of these is a task in `./gulp/tasks`. Each uses a task syntax that assumes you are taking some files like .scss or .html files from a source directory and transforming them into something else. So for your files you have to define *where they are from* (`src`) and *where they go* (`dest`).

It's a little different for images, sass, markup. Just defining paths for these things accounts for most of our build system. Most of our paths are defined in one place: `gulp/config.js`. Now is a good time to read it.

## Installing dependencies

Most of the code we use is packaged with [NPM](https://www.npmjs.com/ "npm"). To get the build environment in place, run this in your terminal in the top level of this directory: `make setup`. This will hopefully:

  * install the `gulp` build tool
  * install the `bower` package manager (bower is like npm or bundler)
  * `npm install` the libs listed in `package.json` 
  * `bower install` the libs listed in `bower.json`

To see what's installed, read the `./Makefile`.

## Local development of meedan.com

*:warning: Don't edit the files in `./www`*

To work on the HTML and Sass, edit the files in `./src` while `gulp` runs.

`gulp`, a nodejs base task runner, watches files in `./src` and automatically updates `./www` when files in `./src` are saved. 

Once you've done the `npm install` step, you should be able to run: `gulp`.

That will start the compiler for both the stylesheets ([Sass](sass-lang.com/)) and the HTML ([dust](http://akdubya.github.io/dustjs/ "dust") templates).  It also starts a nifty tool called [browser-sync](http://www.browsersync.io/) which should automatically update your browser when there are changes;

While the gulp compiler is running, edit the source files in `src/` and the web-ready files in `www` will be regenerated.

When you do `bower install` or ran the `make setup` script, some bower modules are installed directly from github:

- `bower install --save-dev https://github.com/meedan/meedan-style.git`
- `bower install --save-dev https://github.com/meedan/bridge-style.git`
- `bower install --save-dev https://github.com/meedan/checkdesk-style.git`

This takes advantage of the fact that bower modules can be installed without being registered in the bower repository.

These "style" modules are collections of CSS (as Sass) that are version controlled and used on multiple projects. 

On other projects we have done this will ruby gems and git submodules, but the bower CLI seems easier for the design team to use. With this style we can use both _top secret_ internal-only repositories *and* open source public repositories. Also, it's nice that bower works well with npm.

At this point none of the repos are public in the bower registry. If they seem useful to others, we might publish them in the future. For now we just have to use the full path the git repo containing a bower.json file.

## Running the images task

Sometimes you need to add new images. For any images you add, you can process them to optimize their resolution, and automatically move them from `src` to `www`. We use a special gulp task for this: `gulp images`. You'll need to have imagemagick or graphicsmagick installed. 

* On a Mac: `brew install imagemagick`
* On Ubuntu: `apt-get install imagemagick`

(You can confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.)

## Working with SVG 

SVG files are joined by the `gulp-svgmin` task into one big SVG file. See [gulp/tasks/images.js]. Then we access those with markup like this: `<svg><use xlink:href="#kf" /></svg>`. The #kf corresponds to the file `images/logos/kf.svg`. Each file name needs to be unique for this reason. Unfortunately it seems SVG referenced in this way can not be styled by external CSS.

### Simultaneously developing the upstream bower modules
    
This is an optional step, for those who want to be able to work into the bower modules from inside this project: Use the wonderful `bower link` command. First you register a local name for a bower component in a repository locally. Then you can install it in another repository, and it uses the latest version of the code.

1. Type `bower link` in a "child module" that you have on your local machine. This tells bower to remember your local repo (like `bridge-style`) is a bower repo that is available to be used locally — as if it were registered in the bower registry under that name.
2. Then you change directory to the "parent project" (like `./meedan.com`) and run `bower link bridge-style`. Now you can edit into `./meedan.com/bower_components/bridge-style` and see the live updates in your parent project without pushing them to the bridge-style repo and updating the child components.
3. Release a new version of both the parent and child module: Change to the child repository and commit your changes. `bower version 0.x.x`, then push the latest tag to github: `git push --tags`. Similarly, release a new version of the parent project with the version number for the child repository updated in the bower.json.

## Releasing new versions

Use `git tag` and `git commit` in the [SemVer](http://semver.org/) style.

When you push an update, try this bower command: `bower version 0.0.1`. (Use `git tag` to see previous tags.)

## Deploying meedan.com

We host this site using [github pages](https://pages.github.com/). 

To deploy the files from the www directory to the gh-pages branch first tag a release like `bower version 2.2.15` then do this awkward incantation: `git branch -D gh-pages && git subtree split --prefix www -b gh-pages && git push -f origin gh-pages:gh-pages --tags`. If that doesn't make sense, don't do it. :)

## Sass

- INSTALLATION: Install the sass components with `bower install`. See `bower.json` to see which version is installed. See `bower_components` to see the Sass used.
- The starting points is screen.scss. That `@imports` everything else.
- We first apply [John Albin's Sass port](https://github.com/JohnAlbin/normalize-scss) of [Necolas Gallagher's normalize](https://github.com/necolas/normalize.css).
- Then we import sass components from meedan-style — these are shared by various Meedan projects. They live in their own [public version-controlled repository](github.com/meedan/meedan-style). Any style in meedan-style is available to all Meedan projects. Only our best, most reusable work goes in this section. 
- Each of the components is documented with [SassDoc](https://github.com/SassDoc/sassdoc). 
- To render the docs, run the server with`gulp` and visit /docs.


## Working with bower components 

- install the component directly on your machine with git clone. So, it will be installed "next to" the "parent" repository.
- use `bower link` as [described here]("http://sassdoc.com/getting-started/").

## Casper Tests

There are integration tests operated by [casperjs](http://casperjs.org/ "CasperJS, a navigation scripting and testing utility for PhantomJS and SlimerJS").  

Note that we use slimerjs instead of phantomjs (for better redirection support as of July 2015).

To run the tests make sure you:

- install standalone global casper and slimerjs executables, for example on a mac with homebrew: `brew install casperjs slimerjs`
- run the tests with `gulp test`

## Pushy Pushy

when the repo gets updated on github, an automatic build and deployment of meedan-com.dev.meedan.com is triggered