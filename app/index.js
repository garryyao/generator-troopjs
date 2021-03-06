var path = require('path');
var _ = require('underscore');
_.str = require('underscore.string');
_.date = require('underscore.date');
var yeoman = require('yeoman-generator');
var cheerio = require('cheerio');
var beautifier = require('js-beautify');
var Generator = yeoman.generators.Base;
var requirejs = require('requirejs/bin/r.js');
var GruntEditor = require('gruntfile-editor');
var program = require('ast-query');
var esprima = require('esprima');
var BOWER_DEPS = {
  'modular': {
    'troopjs-compose': '',
    'troopjs-core': '',
    'troopjs-log': '',
    'troopjs-net': '',
    'troopjs-jquery': '',
    'troopjs-requirejs': '',
    'troopjs-dom': '',
    'troopjs-data': '',
    'troopjs-opt': ''
  },
  'bundle': {
    'jquery': '^2',
    'poly': '^0',
    'requirejs': '^2',
    'troopjs': 'troopjs#build/3.x',
    'when': '^3'
  }
};
var FORMAT_OPTIONS = {
  indent_char: ' ',
  indent_size: 2
};
module.exports = Generator.extend({
  constructor: function() {
    Generator.apply(this, arguments);
    this.option('modular', {
      desc: 'use individual TroopJS modules as dependencies instead of the whole bundle',
      type: 'boolean',
      defaults: false
    });
    // create the application bootstrap file
    this.indexFile = function() {
      var me = this;
      var $ = cheerio.load(me.read('index.html'));
      // page title
      $('title').html(me.options['app-name']);
      // deploy scripts
      $('#requirejs').removeAttr('id').attr('src', path.join(me.options['bower-dir'], 'requirejs/require.js'));
      $('#bootstrap').removeAttr('id').attr('src', 'main.js');
      // reformat html
      me.write('index.html', beautifier.html($.html(), FORMAT_OPTIONS));
    };
    this.mainFile = function() {
      var me = this;
      var done = me.async();
      function addRequire(fn, module) {
        var tree = program(fn);
        var require = tree.callExpression('require');
        var args = require['arguments'].nodes[0];
        var modules = args[0].elements;
        var str = esprima.parse('"' + module + '"').body[0].expression;
        modules.splice(0, 0, str);
        var params = args[1].params;
        var ident = esprima.parse(module).body[0].expression;
        params.splice(0, 0, ident);
        return eval('(' + tree.toString() + ')');
      }
      requirejs.tools.useLib(function(require) {
        var contents = require('transform').modifyConfig(me.read('main.js'), function(config) {
          config.baseUrl = me.options['bower-dir'];
          config.packages.push({
            name: _.str.slugify(me.options['app-name']),
            location: '..'
          });
          if (!me.options.modular) {
            config.packages.push({
              name: 'troopjs',
              main: 'maxi.js'
            });
            // add one more require for troopjs bundle explicitly.
            config.callback = addRequire(config.callback, 'troopjs');
          }
          return config;
        });
        me.write('main.js', beautifier(contents, FORMAT_OPTIONS));
        done();
      });
    };
    // initialize all other non-interactive options.
    var options = this.options;
    options['bower-dir'] = JSON.parse(this.read('.bowerrc')).directory || 'bower_components';
  },
  prompts: function() {
    var done = this.async();
    // have Yeoman greet the user.
    this.log(this.yeoman);
    var prompts = [{
        type: 'input',
        name: 'app-name',
        message: 'name this app?',
        default: this.determineAppname()
      }];
    this.prompt(prompts, function(options) {
      _.extend(this.options, options);
      done();
    }.bind(this));
  },
  metaFiles: function() {
    var me = this;
    var bower = JSON.parse(me.read('bower.json'));
    var pkg = JSON.parse(me.read('package.json'));
    bower.name = pkg.name = _.str.slugify(me.options['app-name']);
    bower.dependencies = BOWER_DEPS[me.options.modular ? 'modular' : 'bundle'];
    me.write('bower.json', JSON.stringify(bower, null, 2));
    me.write('package.json', JSON.stringify(pkg, null, 2));
  },
  sources: function app() {
    this.copy('README.md');
    this.copy('.bowerrc');
    this.copy('.gitignore');
    this.copy('.editorconfig');
    this.indexFile();
    this.mainFile();
    this.metaFiles();
  },
  grunt: function() {
    var gruntfile = new GruntEditor(this.read('Gruntfile.js'));
    gruntfile.insertConfig('bowerDir', '"' + this.options['bower-dir'] + '"');
    this.write('Gruntfile.js', gruntfile.toString());
  },
  dependencies: function() {
    this.installDependencies();
  }
});
