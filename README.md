## Installing dependencies

Most of the code we use is packaged with [NPM](https://www.npmjs.com/ "npm"). To get the build environment in place...

Run this in your terminal in the top level of this directory: `make setup`

This will hopefully:

  * install the `gulp` build tool
  * install the `bower` javascript library tool (bower is like npm, but focussed on the browser)
  * install the js libs listed in `package.json` to support the local gulp build environment
  * install the js libs listed in `bower.json` to provide libraries for the browser

To see what's installed, read the makefile.

## Editing locally

### Don't edit the files in `./www`

To work on the HTML and Sass, edit the files in `./src`.  

The files in `./src` are "built" using `gulp` and are "rendered" in `./www`

`gulp`, a nodejs base task runner, watches files in `./src` and automatically updates `./www` when files in `./src` are saved. 

Once you've done the `npm install` step, you should be able to run: `gulp`.

That will start the compiler for both the stylesheets ([Sass](sass-lang.com/)) and the HTML ([dust](http://akdubya.github.io/dustjs/ "dust") templates).  It also starts a nifty tool called [browser-sync](http://www.browsersync.io/) which should automatically update your browser when there are changes;

While the gulp compiler is running, edit the source files in `src/` and the web-ready files in `www` will be regenerated.

## Installing the bower modules

We install own own internal modules with bower:

    `bower install --save-dev https://github.com/meedan/meedan-style.git`
    `bower install --save-dev https://github.com/meedan/bridge-style.git`
    `bower install --save-dev https://github.com/meedan/checkdesk-style.git`

These "style" modules are collections of CSS (as Sass) that are version controlled and used on multiple projects.(On other projects we have done this will ruby gems and git submodules, but the bower CLI seems easier for the design team to use.) With this style we can use secret internal-only repositories and open source public repositories.

At this point none of the repos are public in the bower registry. If they seem useful to others, we might publish them in the future. For now we just have to use the full path the git repo containing a bower.json file. It seems like the simplest possible way to create a version-controlled dependency graph!

## Optional: Processing images

Before deployment sometimes you need to add new images and process them to optimize their resolution.

We use a different gulp task for this: `gulp images`

You'll need to have imagemagick or graphicsmagick installed. 

* On a Mac: `brew install imagemagick`
* On Ubuntu: `apt-get install imagemagick`

(You can confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.)

### Note about SVG

SVG files are joined by the `gulp-svgmin` task into one big SVG file. See [gulp/tasks/images.js]. Then we access those with markup like this: `<svg><use xlink:href="#kf" /></svg>`. The #kf corresponds to the file `images/logos/kf.svg`. Each file name needs to be unique for this reason.

Unfortunately SVG referenced in this way can not be styled by CSS.

### Developing bower modules
    
This is an optional step, for those who want to be able to work into the bower modules from inside this project. Use the wonderful `bower link` command. 

With `bower link` you register a local name for a repository that lives locally. Then you can install it in another repository, and it uses the latest code. This is great for bower package maintainers. The alternative would be tedious, to publish new changes and pull them each time. This way lets you work on the child module in your parent project without changing contexts. 

1. First get a copy of the bower components you want to work on: `git clone https://github.com/meedan/bridge-style.git` — that gives you a copy of the `bridge-style` bower component on your machine. 
2. Then you run `bower link` inside that directory. This tells bower to remember your local `bridge-style` is a bower repo that is available to be used, as if it were registered in the bower registry.
3. Then you change to the parent directory (like `meedan.com` where the bower.json file lives) and run `bower link bridge-style`.

Result: you can edit into `bower_components/bridge-style` and see the live updates in your parent project without pushing them to the bridge-style repo and updating the child components.

When you make changes this way, be sure to update the version number in `bridge-style` so that other projects will get the latest when they `bower update`.

## Deploying

We host this site using [github pages](https://pages.github.com/). 

To deploy the files from the www directory to the gh-pages branch first tag a release like `bower version 2.2.15` then do this awkward incantation: `git branch -D gh-pages && git subtree split --prefix www -b gh-pages && git push -f origin gh-pages:gh-pages --tags`. If that doesn't make sense, don't do it.

