#!/bin/sh
#################
#filePath Prefix
#################
dirPrefix=`dirname $0` #直接使用dirPrefix=dirname $0有问题
lessDir="$dirPrefix"'/dev/less/'
cssDir="$dirPrefix"'/assets/css/'
coffeeDir="$dirPrefix"'/dev/coffee/'
jsDir="$dirPrefix"'/assets/js/'

#clear old js/css files
rm $cssDir*
rm $jsDir*

#less files
for lessFile in $( find $lessDir*.less )
do
    cmd="lessc -x $lessFile > $cssDir$( basename $lessFile .less ).css"
    eval $cmd
    #print the message
    echo $cmd
done
#coffee files
for coffeeFile in $( find $coffeeDir*.coffee )
do
    cmd="coffee -c -o $jsDir $coffeeFile"
    eval $cmd
    #print the message
    echo $cmd
done
