#!/bin/sh
# Move *.js and *.map files and copy *.coffee files under ../coffee/ directory
mv ../coffee/*.js ../../assets/js/
mv ../coffee/*.map ../../assets/js/
cp ../coffee/*.coffee ../../assets/js/
