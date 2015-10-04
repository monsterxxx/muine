'use strict';

module.exports = function(grunt){
  //Project configuration
  grunt.initConfig({
    sass: {
      dist: {                            // Target
        options: {                       // Target options
          style: 'nested'               //expanded
        },
        files: {                         // Dictionary of files
          'app/css/app.css': 'app/css/app.sass'       // 'destination': 'source'
        }
      }
    },
    watch: {
      scripts: {
        files: "app/**/*.js",
        options: {
          livereload: true
        }
      },
      styles: {
        files: "app/**/*.sass",
        tasks: "sass",
        options: {
          livereload: true
        }
      },
      views: {
        files: "app/**/*.html",
        options: {
          livereload: true
        }
      }
    }
  });
  //Load plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //Register tasks
  grunt.registerTask('build', ['sass']);
  //Default task
  grunt.registerTask('default', ['build', 'watch']);
};
