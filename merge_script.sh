#!/bin/sh

setup_git() {
  git config --global user.email "praveenguda.kumar@gmail.com"
  git config --global user.name "gudapraveenkumar"
}

commit_website_files() {
   git checkout master
   git branch
   git merge $TRAVIS_COMMIT || exit
}

upload_files() {
   git remove -v
   git push https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/gudapraveenkumar/task-manager.git
   # git remote -v
   # git remote remove origin
   # git remote push origin https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/gudapraveenkumar/task-manager.git
   # # git remote add origin-pages https://${GITHUB_KEY}@github.com/gudapraveenkumar/task-manager.git > /dev/null 2>&1
   # git push --quiet origin master
}

setup_git
commit_website_files
upload_files
