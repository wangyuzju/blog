path = require "path"

module.exports = (grunt) ->
  grunt.initConfig
    # project configuration
    JSDIR: "assets/js"
    CSSDIR: "assets/css"


    coffee:
      options:
        bare: true
        sourceMap: true
        cwd: "dev/coffee"
      all:
        files: [
          expand: true # 对dest而言自动创建不存在的目录
          src: ["dev/coffee/*.coffee"]
          dest: "<%= JSDIR %>"
          rename: (dest, srcPath, options)->
            return path.join dest, path.basename(srcPath)
          ext: ".js"
        ]
      # only compile changed file

    less:
      options:
        compress: true

      all:
        files: [
          src: ["dev/less/common.less"]
          dest: "<%= CSSDIR %>/common.css"
        ]

    watch:
      scripts:
        files: ["dev/coffee/*.*"]
        tasks: ["coffee"]
      stylesheets:
        files: ["dev/less/*.*"]
        tasks: ["less"]

    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-less"
    grunt.loadNpmTasks "grunt-contrib-watch"

    grunt.registerTask "default", ["coffee", "less"]