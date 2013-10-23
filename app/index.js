'use strict';
var util = require('util');
var path = require('path');
var _ = require('underscore');
_.str = require('underscore.string');
_.date = require('underscore.date');
var yeoman = require('yeoman-generator');


var TroopjsAppGenerator = module.exports = function TroopjsAppGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TroopjsAppGenerator, yeoman.generators.Base);

var PROMPT_APP_NAME = 'APP_NAME';
var PROMPT_APP_NAME_DASHED = 'APP_NAME_DASHED';
var PROMPT_APP_NAME_UNDERSCORED = 'APP_NAME_UNDERSCORED';
var PROMPT_CREATE_INDEX = 'CREATE_INDEX';

var cwd = process.cwd();

// Current working directory name.
var dirName = path.relative(path.resolve(cwd, '../'), cwd);

TroopjsAppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			type: 'input',
			name: PROMPT_APP_NAME,
			message: "How do you like to name your app?",
			default: dirName
		}
	];

	this.prompt(prompts, function (options) {
		_.extend(this, options);
		this[PROMPT_APP_NAME_DASHED] = _.str.slugify(this[PROMPT_APP_NAME]);
		this[PROMPT_APP_NAME_UNDERSCORED] = this[PROMPT_APP_NAME_DASHED].replace(/-/g, '_');
		cb();
	}.bind(this));

};

TroopjsAppGenerator.prototype.app = function app() {

	this.directory("widget");
	this.template('main.js');
	this.template('index.html');
	this.template('package.json');
	this.template('bower.json');
	this.copy('Gruntfile.js');
};

TroopjsAppGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('_editorconfig', '.editorconfig');
	this.copy('_jshintrc', '.jshintrc');
	this.copy('_bowerrc', '.bowerrc');
	this.copy('_gitignore', '.gitignore');
	this.copy('_gitattributes', '.gitattributes');
	this.copy('_gitmodules', '.gitmodules');
	this.copy('_travis.yml', '.travis.yml');
	this.copy('_README.md', 'README.md');
};
