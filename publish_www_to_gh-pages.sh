#!/bin/bash

echo <<YMMV

  This script does not always leave gh-pages branch suitable for deployment.

  Here is an alternate way to deploy:
  
  1. git checkout master 
  2. git branch -D gh-pages
  3. git subtree split --prefix www -b gh-pages
  4. git push -f origin gh-pages:gh-pages

  Unfortunately because of 2 and 4, this leaves no record of the deployment.

  CGB

YMMV

# checkout gh-pages branch
git checkout gh-pages

# make sure we're sync'd to origin to avoid the merge
git pull

# and get rid of everything
git rm -rf .

# then cherry pick www content here
git checkout master -- www

# and move it into place
git mv www/* ./
git rm -rf www

# commit the change
git commit -m "website update";

# switch back to master
git checkout master

echo <<EOF

   gh-pages branch has been updated with the content from ./www

   you should take a look at that branch by running:
         git checkout gh-pages

   if all looks good you can publish these changes with
         git push --all origin

EOF
