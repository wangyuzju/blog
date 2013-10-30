define( (require, exports, module) ->
  prettify = require('prettify')
  $ = require('jquery')
  
  blog = {}
  
  blog.editPage =  ->
    console.log 'editing'
  
  window.onload = ->
    $('#edit-page').click blog.editPage


    # highlight code
#    codes = document.querySelectorAll("pre code")
#    for obj in codes
#      obj.className = 'prettyprint linenums'
#    if codes.length > 0
#      prettify()
#      console.log(codes.length + ' places prettyprinted!')
#    return
)
