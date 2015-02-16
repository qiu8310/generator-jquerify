'use strict';
var yeoman = require('yeoman-generator'),
  fs = require('fs'),
  path = require('path');


module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('modName', { type: String, required: true, banner: 'The mod name you want to create' });
    // And you can then access it later on this way; e.g. CamelCased
    this.modName = this._.camelize(this.modName);
  },

  initializing: function() {

  },

  configuring: function() {
    var cfg = this.config.getAll();

    this.srcDir = cfg.srcDir;
    this.slugname = cfg.slugname;
  },


  writing: function() {
    var target = path.join(this.srcDir, this.modName + '.js');
    this.template('mod.tpl', target);
  }

});