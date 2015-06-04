## Installing dependencies

Most of the code we use is packaged with [NPM](https://www.npmjs.com/ "npm"). To get the build environment in place...

Run this in your terminal in the top level of this directory: `make setup`

OR you can run the following commands individually:

````                
  npm install -g gulp
  npm install -g bower
  npm install
  bower install
````

This will hopefully:

  * install the `gulp` build tool
  * install the `bower` javascript library tool (bower is like npm, but focussed on the browser)
  * install the js libs listed in `package.json` to support the local gulp build environment
  * install the js libs listed in `bower.json` to provide libraries for the browser

## Working locally

### TL;DR: Don't edit the files in `./www`

To work on the HTML and Sass, edit the files in `./src`.  

The files in `./src` are "built" using `gulp` and are "rendered" in `./www`

`gulp`, a nodejs base task runner, watches files in `./src` and automatically updates `./www` when files in `./src` are saved. 

Once you've done the `npm install` step, you should be able to run:

      gulp

That will start the compiler for both the stylesheets ([Sass](sass-lang.com/)) and the HTML ([dust](http://akdubya.github.io/dustjs/ "dust") templates).  It also starts a nifty tool called [browser-sync](http://www.browsersync.io/) which should automatically update your browser when there are changes;

While the gulp compiler is running, edit the source files in `src/` and the web-ready files in `www` will be regenerated.

## Processing images

Before deployment sometimes you need to add new images and process them to do two things: 

- optimize their file size (in Kilobytes, eg, compression)
- change their image size (in pixels, eg, responsive images)

We use a different gulp task for this: 

        gulp images

You'll need to have imagemagick or graphicsmagick installed. 

On a Mac:

        brew install imagemagick

On Ubuntu: 

        apt-get install imagemagick

(You can confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.)

## Note about SVG

SVG files are joined by the `gulp-svgmin` task into one big SVG file. See [gulp/tasks/images.js]. Then we access those with markup like this: `<svg><use xlink:href="#kf" /></svg>`. The #kf corresponds to the file `images/logos/kf.svg`. Each file name needs to be unique for this reason.

Unfortunately SVG referenced in this way can not be styled by CSS.

## Deploying

In very real terms, the gh-pages branch *is* the website.  This is because we currently host this site using [github pages](https://pages.github.com/). 

To deploy the files from the www directory to the gh-pages branch, run:

```
   ./publish_www_to_gh-pages.sh
```

(see the comments in that script for further explanation of the steps it takes)

then see if everything looks okay in the gh-pages branch
if it looks okay, push it live:

```
   git push --all origin
```

Then take a look at the live site and make sure the contents have been updated!

## Installing bower modules

You can install private modules like this:

`bower install https://github.com/meedan/meedan-style.git`

By default it will be 

## Note about developing the bower modules

Say you want to be able to work into the bower modules from inside this project. Good news: there is functionality in bower for this: `bower link`: 

1. First get a copy of the bower repos you want to update: `git clone https://github.com/meedan/bridge-style.git` — that gives you a copy of the `bridge-style` bower library on your machine. 
2. Then you run `bower link` inside that directory. This has the affect of registering your local `bridge-style` as a bower repo that is available to be used.
3. Then you change to the parent directory (like `meedan.com` where the bower.json file lives) and run `bower link bridge-style`.

Result: you can edit into `bower_components/bridge-style`, then commit those changes and push them to the bridge-style repo. 

NOTE: when you make changes this way, be sure to update the version number in `bridge-style` so that other projects will get the latest when they `bower update`.