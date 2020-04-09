module.exports = function (grunt) {
    grunt.initConfig({
      htmlmin: {
        options: {
          collapseWhitespace: true,
          preserveLineBreaks: false
        },
        files: {
          src: './index.html',
          dest: './dist/index.html'
        }
      },
      cssmin: {  
        './dist/note.css': 'note.css'
      },
      uglify: {
        release:{
          files: {
            './dist/note.js': 'note.js'
          }
        }       
      }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['htmlmin','cssmin','uglify:release']); 
  };