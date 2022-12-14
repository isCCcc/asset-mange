#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'update'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
  git push -f git@github.com:isCCcc/asset-manage-website.git master:gh-pages
# git push -f git@gitee.com:meatball-c/blanche-account-website.git master:gh-pages

cd -
echo https://iscccc.github.io/asset-manage-website/
