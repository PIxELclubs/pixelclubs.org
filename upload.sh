#!/usr/bin/env bash

set -ve

git config --global user.email 'timothy+pxbot@pixelclubs.org'
git config --global user.name 'PIxEL Bot on Travis'
git config --global push.default simple

git clone 'https://github.com/PIxELclubs/pixelclubs.github.io.git' web
cd web
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}@github.com" > .git/credentials
git ls-files | grep -Fvx CNAME | xargs rm -rf
cp -a ../out/* .
git commit -a -m 'Update'
git push
