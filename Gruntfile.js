module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: false
            },
            dist: {
                files: {
                    'pixtulate.min.js': ['pixtulate.js']
                }
            }
        },
        wrap: {
            require: {
                src: ['pixtulate.js'],
                dest: 'pixtulate.require.js',
                options: {
                    wrapper: ['define(function () {\n ', '\nreturn{\npixtulate: pixtulate\n}});']
                }
            },
            requiremin: {
                src: ['pixtulate.min.js'],
                dest: 'pixtulate.require.min.js',
                options: {
                    wrapper: ['define(function () {', ' return{ pixtulate: pixtulate}});']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'pixtulate.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-wrap');

    //todo: add tests
    // grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['jshint', 'uglify', 'wrap']);

};