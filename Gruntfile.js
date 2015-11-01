(function(){
'use strict';

module.exports = function(grunt){
  //Project configuration
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'e2e-tests/**/*.js'],
      options: {
        laxbreak: true
      }
    },
    sass: {
      dist: {                            // Target
        options: {                       // Target options
          style: 'nested'               //expanded
        },
        files: {                         // Dictionary of files
          'app/css/app_sass.css': 'app/css/app.sass'       // 'destination': 'source'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
          //,require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'app/css/app_sass.css',
        dest: 'app/css/app.css'
      }
    },
    svgstore: {
      options: {
        prefix : 'shape-', // This will prefix each ID
        svg: {
          style: 'display: none;'
        },
        formatting : {
          indent_size : 2
        }
      },
      default : {
        files: {
          'app/assets/shapes.svg': ['app/assets/svg/*.svg']
        },
      }
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      },
      scripts: {
        files: ["app/**/*.js", "e2e-tests/**/*.js"],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: "app/**/*.sass",
        tasks: ['sass', 'postcss'],
        options: {
          livereload: true
        }
      },
      views: {
        files: "app/**/*.html",
        options: {
          livereload: true
        }
      },
      svg: {
        files: "app/assets/svg/*.svg",
        tasks: ['svgstore'],
        options: {
          livereload: true
        }
      }
    }
  });
  //Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //Register tasks
  grunt.registerTask('build', ['jshint', 'sass', 'postcss', 'svgstore']);
  //Default task
  grunt.registerTask('default', ['build', 'watch']);
};
})();
