#!/bin/bash
# This script finalizes the npm package version by removing the -dev.x suffix using `npm version`.
# It creates a release branch, updates package.json to the production version, commits, and pushes the branch.
# Usage:
#   npm-version-release.sh

set -e

PACKAGE='cib-common-frontend'

echo "Creating production release for $PACKAGE..."

# Navigate to project root if not already there
if [ ! -f "pom.xml" ]; then
    cd ..
fi

# Ensure we're on main and up to date
git checkout main
git fetch origin
git pull origin main

# Get current version and extract production version (remove -dev.x)
CURRENT_VERSION=$(node -p "require('./package.json').version")
PROD_VERSION=$(echo $CURRENT_VERSION | sed 's/-dev\.[0-9]*$//')

echo "Current version: $CURRENT_VERSION"
echo "Production version: $PROD_VERSION"

# Create release branch
BRANCH_NAME="release-$PACKAGE-$PROD_VERSION"
git checkout -b "$BRANCH_NAME"

# 1. Bump to production version (removes -dev.x)
npm version --no-git-tag-version $PROD_VERSION
git add package.json package-lock.json
git commit -m "release: $PACKAGE $PROD_VERSION"

# 2. Push commits and tags
git push origin "$BRANCH_NAME"

echo "Package: $PACKAGE"
echo "Released version: $PROD_VERSION"
echo "Created branch: $BRANCH_NAME"
echo "Ready to create PR for release!"
