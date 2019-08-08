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
   git remote -v
   git remote remove origin
   # git remote add origin git@github.com:gudapraveenkumar/task-manager.git
   # git push https://${GITHUB_KEY}@github.com/gudapraveenkumar/task-manager.git

   # git push https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/gudapraveenkumar/task-manager.git
   git remote add travis-user https://$GITHUB_KEY@github.com/gudapraveenkumar/task-manager.git
   git push travis-user master
}

setup_git
commit_website_files
upload_files
