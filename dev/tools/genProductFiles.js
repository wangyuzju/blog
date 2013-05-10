#!/usr/bin/node
/**
 *Watch the '../coffee/' directory for moving the *.js and *.map files
* and copying the *.coffee files to '../../assets/js/' directory
*/
var exec = require('child_process').exec;


exec('cd ../coffee/ ; coffee -cm .', function(error, stdout, stderr){
  if(error === null){
    if(stdout){
      console.log(stdout);
    }else{
      /*copy these file to the product directory*/
      exec('sh moveToProductDIR.sh', function(error, stdout, stderr){
        if(stdout){
          console.log(stdout);
        }
      });
    }
  }
});