#!/bin/bash
# Universal script to bump dev version for bpm-sdk, cib-common-components, or frontend
# Usage: 
#   ./bump-npm-dev.sh

set -e

PACKAGE='cib-common-frontend'

echo "Bumping $PACKAGE dev version..."

# Navigate to project root if not already there
if [ ! -f "package.json" ]; then
    cd ..
fi

# Ensure we're on main and up to date
git checkout main
git fetch origin
git pull origin main

# Create new branch
BRANCH_NAME="bump-$PACKAGE-version-$(date +%Y%m%d-%H%M%S)"
git checkout -b "$BRANCH_NAME"

# Bump prerelease version
npm version prerelease --preid=dev --no-git-tag-version

# Get the new version
NEW_VERSION=$(node -p "require('./package.json').version")

# Commit changes
git add package.json package-lock.json
git commit -m "bump: increase $PACKAGE version to $NEW_VERSION"

# Push branch
git push origin "$BRANCH_NAME"

echo "Package: $PACKAGE"
echo "Created branch: $BRANCH_NAME"
echo "Bumped to version: $NEW_VERSION"
echo "Ready to create PR!"
