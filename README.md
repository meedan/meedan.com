## Installing dependencies

Most of the code we use is packaged with [NPM](https://www.npmjs.com/ "npm"). To get the build environment in place...

Just run
		make setup

OR you can run the following commands individually:
                
                npm install -g gulp
                npm install -g bower
                npm install
		bower install


This will
  * install the `gulp` build tool
  * install the `bower` javascript library tool (it's like npm, but focussed on the browser)
  * install the tools listed in `package.json` to support the local gulp build environment.
  * install the tools listed in `bower.json` to provide libraries for the browser.

## Working locally

### don't edit the files in `./www`

you'll enjoy life more by editing the files in the `./src` directory.  The files in the src directory are "built" using `gulp` and are "rendered" in the `./www`


We use a tool called gulp. Once you've done the `npm install` step, you should be able to run:

                gulp

That will start the compiler for both the stylesheets ([Sass](sass-lang.com/)) and the HTML ([dust](http://akdubya.github.io/dustjs/ "dust") templates).

While the gulp compiler is running, edit the source files in `src/` and the web-ready files in `www` will be regenerated.

## Deploying

In very real terms, the gh-pages branch *is* the website.  This is because we currently host this site using [github pages](https://pages.github.com/). 

To deploy the files from the www directory to the gh-pages branch, run:

   ./publish_www_to_gh-pages.sh

(see the comments in that script for further explanation of the steps it takes)

then see if everything looks okay in the gh-pages branch
if it looks okay, push it live:

   git push --all origin

Then take a look at the live site and make sure the contents have been updated!