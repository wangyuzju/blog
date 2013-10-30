module.exports = (grunt) ->
  grunt.initConfig
    # project configuration
    JSDIR: "assets/js"
    CSSDIR: "assets/css"

    coffee:
      all:
        options:
          bare: true
        files: [
          #expand: true # 对dest而言自动创建不存在的目录
          src: ["dev/coffee/*.coffee"]
          dest: "<%= JSDIR %>/main.js"
        ]

    less:
      options:
        paths: "<%= CSSDIR %>"

      all:
        files: [
          src: ["dev/less/common.less"]
          dest: "<%= CSSDIR %>/common.css"
        ]

    watch:
      scripts:
        files: ["dev/coffee/*.*", "dev/less/*.*"],
        tasks: ["default"]

    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-less"
    grunt.loadNpmTasks "grunt-contrib-watch"

    grunt.registerTask "default", ["coffee", "less"]