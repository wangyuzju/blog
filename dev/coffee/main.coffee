window.onload = ->
  pretty = document.querySelectorAll("pre code")
  for obj in pretty
    obj.className='prettyprint linenums'
  if pretty.length > 0 
    prettyPrint()
    console.log (pretty.length + ' places prettyprinted!')
  return