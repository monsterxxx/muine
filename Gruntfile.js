(function(){
'use strict';

module.exports = function(grunt){
  //Project configuration
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'e2e-tests/**/*.js']
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
        map: true, // inline sourcemaps

        // or
        // map: {
        //     inline: false, // save all sourcemaps as separate files...
        //     annotation: 'dist/css/maps/' // ...to the specified directory
        // },
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
          //,require('cssnano')() // minify the result
        ]
      },
      // src: 'app/css/app_sass.css',
      // dest: 'app/css/app.css'
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
      scripts: {
        files: "app/**/*.js",
        options: {
          livereload: true
        }
      },
      styles: {
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
  grunt.registerTask('build', ['sass', 'postcss', 'svgstore']);
  //Default task
  grunt.registerTask('default', ['build', 'watch']);
};
})();
