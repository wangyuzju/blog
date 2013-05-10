define( (require, exports, module) ->
  prettify = require('prettify')

  window.onload = ->
    codes = document.querySelectorAll("pre code")
    for obj in codes
      obj.className = 'prettyprint linenums'
    if codes.length > 0
      prettify()
      console.log(codes.length + ' places prettyprinted!')
    return
)

