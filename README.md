# This is a build system for [meedan.com](http://meedan.com)

This is an environment for fast, synchronized browser refreshing as you edit Sass, HTML and Javascript.

## Overview

0. Install the npm and node and ruby 2.x
1. `make` — This will run the make file to install the build system (local and global npm modules, and ruby gems).
2. `npm start` — this will run middleman with bundler.
3. Edit .scss, .html and .js files. The browser should live-reload.

## This is a [Middleman](http://middlemanapp.com/) site

[Middleman](http://middlemanapp.com/) compiles our static site `build` from files in `source`.

Middleman is a rubyish (sinatraish) and markdownish templating & routing system. When you work with middleman you are generating a static site that is generated in a `build` directory, but you only see the `source` files while you are working. When you are ready to make the static build of all your pages with all your templating logic re-run, you do `middleman build`. You have to do that before you deploy. Commit and push the latest `build` directory to deploy it. Middleman is designed for people who do this routine all day. 

## Quick start

* `make` (install dependencies)
* `npm start` (start middleman with bundler)

## Even quicker start: copy editing via github.com

If you want to just change some copywriting, you really don't even need to set up the app locally.

Copy edits can go in a yaml file like `en.yml`, for English.— https://github.com/meedan/meedan.com/blob/develop/locales/en.yml.

You can edit the copy using github.com by clicking 'edit' on that file. ^^

Make sure you are on the `develop` branch. 

How this works: With middleman, templates in `source` are rendered with the values from `locales` and `data` directories (and potentially other dynamic content sources), then all the output static HTML goes to `build`. So, files in `build` are often erased and rewritten when you run `middleman build`, and your edit will not appear in the deployment.

Bonus: If you make a commit on the `develop` branch, the Jenkins server will pull your change to the server and run `middleman build` for you, deploying automatically to staging! And a bot will tell you about it in Slack. :zap:

Note: All copy writing needs to be localized. Consider editing directly into a translation manager instead of editing those files directly. 

## Installing dependencies

The code we use here is packaged with [Rubygems](http://rubygems.com/) and [NPM](https://www.npmjs.com/ "npm"). To get the build environment in place, run this in your terminal in the top level of this directory: 

  * `make setup`

Theoretically, that's it. The makefile installs bundler, bower, and npm then does bundle install and bower install. After everything installs, you can hopefully run `npm start`.

## Local development of meedan.com

*:warning: Don't edit the files in `./build` :) * 

To work on the HTML and Sass, edit the files in `./source` while `gulp` runs.

`npm start` will start the middleman compiler for both the stylesheets ([Sass](sass-lang.com/)) and the HTML. Middleman runs with livereload and should refresh the page automatically when you make changes.

## Getting extra logs from middleman

To run middleman directly without the `npm start` shortcut, to see more logging details: do `bundle exec middleman --verbose`.

## Bundling and minifying SVG with gulp 

- *gulp bundle-svg* — bundle all of the svg files into a single file we can inline into the template.

SVG files are joined by the `gulp-svgmin` task into one big SVG file. See [gulp/tasks/images.js]. Then we access those with markup like this: `<svg><use xlink:href="#kf" /></svg>`. The #kf corresponds to the file `images/logos/kf.svg`. Each file name needs to be unique for this reason. (Note — Unfortunately it seems SVG referenced in this way can not be styled by external CSS. The main purpose of combining the files is just to reduce the number of HTTP requests.)

## Adding a new logo 

If you want to add a new partner or supporter logo, you need to create two versions, `@1x` (at least 100px) and `@2x` (at least 200px).

Render both sizes (eg with sketch) then do another pass on optimizing them. To optimize them you can do the best work with a bitmap program with good optimization settings (Acorn, Photoshop) or at least use the gulp task `gulp imagemin`. Check to make sure the file size is in the range of the other logos before committing a logo that is too big. The smaller size should be about 10k, the larger no more than 30k. Probably use a jpg for smallest file size. (Tip: In the web export, try setting quality very low, near zero.)

Once you have the new images, update the data files `supporter_logos.json` and `checkdesk_partners.json` to include data about the new file, for example:

        {
          "name": "witness",
          "url": "https://witness.org/",
          "type": "png"
        }

The template loops through these values to create the logo-list sections. So, this will add the images to the page.

## Releasing new versions

Use `git tag` and `git commit` in the [SemVer](http://semver.org/) style.

When you push an update, try this bower command: `bower version 0.0.1`. (Use `git tag` to see previous tags.)

## Deploying

To deploy the files from the www directory to the gh-pages branch first tag a release like `git tag v2.3.4 && git push && git push --tags`.
When the repo gets updated on github, an automatic build and deployment of the development site is triggered.
Then `git checkout master`, `git merge develop`, `git push`, and use jenkins to trigger the deploy.

## Sass structure

- middleman compiles and live-reloads the sass for you (although sadly, proper stylesheet injection does not work well in Middleman 3x — 2015-12-30 CGB).
- The starting points is screen.scss. That `@imports` everything else.
- We first apply [John Albin's Sass port](https://github.com/JohnAlbin/normalize-scss) of [Necolas Gallagher's normalize](https://github.com/necolas/normalize.css).
- Then we import our sass components, pages, and utility files from `source/stylesheets`.

## Running tests

There are integration tests operated by [casperjs](http://casperjs.org/ "CasperJS, a navigation scripting and testing utility for PhantomJS and SlimerJS").  

Note that we use slimerjs instead of phantomjs (for better redirection support as of July 2015).

To run the tests make sure you:

- install standalone global casper and slimerjs executables, for example on a mac with homebrew: `brew install casperjs slimerjs`
- run the tests with `npm test`