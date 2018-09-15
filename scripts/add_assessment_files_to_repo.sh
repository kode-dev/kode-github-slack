#!/bin/bash

# Initialize git
cd assessment-test/
git init

# Add and commit files
git add .
git commit -m 'Add test assessment'

# Push to Github
git remote add origin $0
git push -u origin master

# Remove git
rm -rf .git/