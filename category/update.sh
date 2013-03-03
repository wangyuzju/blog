#!/bin/sh
#根据当前目录下所有的文件名和原始文件，自动更新原始文件的变动到其它文件中去

#每次改动的文件
originFile=dailyDone.html
#当前脚本文件名
self=`basename $0`
if [ ! -e $originFile ];then
    echo '本脚本调用位置不正确'
    exit
fi
for file in *;do
    if [ "$file" != "$originFile" ] && [ "$file" != "$self" ];then
        #通过文件名获取category的值
        filePrefix=`basename $file .html`
        #替换category后更新文件
        cmd="sed 's/category: .*/category: $filePrefix/g' $originFile > $file"
        eval $cmd
        echo $cmd
    fi
done
