'use strict';
var path = require('path');
var _ = require('underscore');
_.str = require('underscore.string');
var yeoman = require('yeoman-generator');
var cheerio = require('cheerio');
var Generator = yeoman.generators.Base;

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);
    this.argument('path', {
      desc: 'path of the new widget',
      required: true,
      type: 'string'
    });
  },
  widget: function app() {
    var cwd = this.destinationRoot();

    var appName = _.str.slugify(this.determineAppname());
    var dir = path.join('widget', this['path']);
    var module = path.join(appName, dir, 'main');
    this.destinationRoot(dir);
    this.directory('.');

    this.destinationRoot(cwd);
    this.sourceRoot(cwd);
    var $ = cheerio.load(this.read('index.html'));

    if(!$('[data-weave="' + module + '"]').length){
      $('body').append($('<div>').attr('data-weave', module));
      this.write('index.html', $.html());
    }
  }
});


