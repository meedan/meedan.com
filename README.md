## Installing dependencies

Most of the code we use is packaged with [NPM](https://www.npmjs.com/ "npm"). To install NPM dependencies you do this in the bridge-ui directory:

                npm install

This installs the tools listed in the file `package.json`.

## Working locally

It's hosted on github pages. But, it's the local development environment that makes it easy to work with these little HTML prototypes.

We use a tool called gulp. Once you've done the `npm install` step, you should be able to do something like this:

                cd PROJECTNAME
                gulp

That will start the compiler for both the stylesheets ([Sass](sass-lang.com/)) and the HTML ([dust](http://akdubya.github.io/dustjs/ "dust") templates).

While the gulp compiler is running, edit the source files in `src/` and the web-ready files in `www` will be regenerated.