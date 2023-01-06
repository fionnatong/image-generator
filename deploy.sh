#!/usr/bin/env sh

# abort on errors
set -e

npm run build
cd dist

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:fionnatong/image-generator.git main:gh-pages

cd -