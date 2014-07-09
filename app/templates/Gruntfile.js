/*global module:false*/
module.exports = function (grunt) {

	var path = require('path');
	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", [
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
		return grunt.util._.map(grunt.file.expand(patterns), function (file) {
			return ['<%= pkg.name %>', file.replace(/\.js$/, '')].join('/');
		});
	}

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bowerDir: '',
		clean: {
			tmp: 'tmp',
			dist: 'dist'
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						src: ['<%= bowerDir %>/**/*', 'main.js', '{widget,service}/**/*', '*.html'],
						dest: 'tmp'
					}
				]
			}
		},
		"requirejs-transformconfig": {
			options: {
				// Some transformation goes here.
				transform: function (config) {
					return config;
				}
			},
			dist: {
				files: [
					{
						'dist/main.js': 'main.js'
					}
				]
			}
		},
		requirejs: {
			dist: {
				options: {
					appDir: 'tmp',
					baseUrl: '<%= bowerDir %>',
					mainConfigFile: 'main.js',
					findNestedDependencies: true,
					wrapShim: true,
					skipDirOptimize: true,
					skipModuleInsertion: true,
					optimize: 'none',
					optimizeCss: 'none',
					dir: 'dist',
					modules: [
						{
							name: '<%= pkg.name %>/main',
							include: includeSource(['widget/**/*.js'])
						}
					]
				}
			}
		},
		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '*.html',
			options: {
				root: 'dist'
			}
		},
		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['dist/*.html'],
			options: {
				assetsDirs: ['dist/']
			}
		},
		processhtml: {
			options: {
				process: true
			},
			dist: {
				files: {
					"dist/index.html": "index.html"
				}
			}
		}
	});
};
