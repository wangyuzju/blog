seajs.config({
  # Enable plugins
  plugins: ['shim'],

  # Configure alias
  alias: {
    'prettify': {
      src: 'google-code-prettify/prettify.js',
      exports: 'prettyPrint'
    }
  }
})