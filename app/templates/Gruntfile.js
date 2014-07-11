/*global module:false*/
module.exports = function(grunt) {
  var path = require('path');
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', [
    'clean',
    'copy',
    'requirejs-transformconfig',
    'requirejs',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin'
  ]);
  function includeSource(patterns) {
    return grunt.util._.map(grunt.file.expand(patterns), function(file) {
      return [
        '<%= pkg.name %>',
        file.replace(/\.js$/, '')
      ].join('/');
    });
  }
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    tmpDir: 'tmp',
    distDir: 'dist',
    bowerDir: '',
    clean: {
      tmp: '<%= tmpDir %>',
      dist: 'dist'
    },
    copy: {
      dist: {
        files: [{
            expand: true,
            src: [
              '<%= bowerDir %>/**/*',
              'main.js',
              '{widget,service}/**/*',
              '*.html'
            ],
            dest: '<%= tmpDir %>'
          }]
      }
    },
    'requirejs-transformconfig': {
      options: {
        transform: function(config) {
          return config;
        }
      },
      dist: {
        files: [{
            '<%= tmpDir %>/main.js': 'main.js'
          }]
      }
    },
    requirejs: {
      dist: {
        options: {
          appDir: '<%= tmpDir %>',
          baseUrl: '<%= bowerDir %>',
          mainConfigFile: '<%= tmpDir %>/main.js',
          findNestedDependencies: true,
          wrapShim: true,
          skipDirOptimize: true,
          skipModuleInsertion: true,
          optimize: 'none',
          optimizeCss: 'none',
          dir: '<%= distDir %>',
          onBuildWrite: function(moduleName, path, contents) {
            // compensate the missing "troopjs/maxi" module definition when using the troopjs bundle
            if (moduleName === 'troopjs/maxi' || moduleName === 'troopjs') {
              contents += '\ndefine(\'troopjs/maxi\',{});';
            }
            return contents;
          },
          modules: [{
              name: '<%= pkg.name %>/main',
              include: includeSource(['widget/**/*.js'])
            }]
        }
      }
    },
    useminPrepare: {
      html: '<%= distDir %>/*.html',
      options: {
        dest: '<%= distDir %>'
      }
    },
    usemin: {
      html: ['<%= distDir %>/*.html'],
      options: {
        assetsDirs: ['<%= distDir %>']
      }
    },
    processhtml: {
      options: {
        process: true
      },
      dist: {
        files: {
          '<%= distDir %>/index.html': '<%= tmpDir %>/index.html'
        }
      }
    }
  });
};