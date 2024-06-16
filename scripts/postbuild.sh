#!/bin/sh
set -x
pwd

if [ $NODE_ENV = "development" ]; then
    echo "Leaving debug comments"
else
    echo "Removing debug comments..."
    cd build
    echo "try again"
    find . -type f -name "*.js" -exec sed -i '/\/\*\! START_REMOVE/,/\/\*\! END_REMOVE \*\//d' {} +
    cd ../
    echo "Removing debug done"
fi