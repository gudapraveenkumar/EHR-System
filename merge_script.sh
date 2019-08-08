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
   git remote add travis-user1 https://9ac4fe5751919002e3d34103578db6ec4104bcd1@github.com/gudapraveenkumar/task-manager.git
   git push travis-user1 master
}

setup_git
commit_website_files
upload_files
