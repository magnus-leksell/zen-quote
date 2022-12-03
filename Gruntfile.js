const sass = require('node-sass');

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        replace: {
            dist: {
              options: {
                patterns: [
                  {
                    match: 'zen.',
                    replacement: 'zen.min.'
                  }
                ],
                usePrefix: false
              },
              files: [
                {
                  expand: true,
                  flatten: true,
                  src: ['public/index.html'],
                  dest: 'build/static/'
                }
              ]
            }
        },
        /*copy: {
            html: {
                src: 'public/index.html',
                dest: 'build/static/index.html'
            }
        },*/
        sass: {
            options: {
                implementation: sass,
                includePaths: ['sass']
            },
            public: {
                files: {
                    'public/css/zen.css': 'sass/index.sass'
                },
		options: {
                    outputStyle: 'expanded'
                }
            },
            build: {
                files: {
                    'build/static/css/zen.min.css': 'sass/index.sass'
                },
		options: {
                    outputStyle: 'compressed'
                }
            }
        },
        terser: {
            build: {
                files: {
                    'build/static/scripts/zen.min.js': 'public/scripts/zen.js'
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-terser');

    // Just build css from sass and save to public/css folder
    grunt.registerTask('build-css', ['sass:public']);

    // Default task(s)
    grunt.registerTask('default', ['replace', 'sass', 'terser']);
};
