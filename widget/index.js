'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore');
_.str = require('underscore.string');
_.date = require('underscore.date');


var WidgetGenerator = module.exports = function WidgetGenerator(args, options, config) {

	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);
	console.log('Generating TroopJS widget "%s"', this.name);
};

util.inherits(WidgetGenerator, yeoman.generators.NamedBase);

WidgetGenerator.prototype.app = function files() {
	// Create and work in a widget directory.
	this.destinationRoot("widget/" + _.str.slugify(this.name));
	this.copy('main.js');
	this.copy('main.css');
	this.copy('main.html');
};
