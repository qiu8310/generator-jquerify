'use strict';
var yeoman = require('yeoman-generator'),
  yoHelper = require('yo-helper');


module.exports = yeoman.generators.Base.extend({
  //initializing: function () {
  //  this.targetDir = this.destinationRoot();
  //  //this.targetDir = process.cwd();
  //  //this.tplDir = path.join(__dirname, 'templates');
  //  this.tplDir = this.sourceRoot();
  //  this.pkg = require('../package.json');
  //},

  prompting: {
    welcome: yoHelper.welcome('jquerify'),

    askForModuleName: yoHelper.askForModuleName(function(data) {
      this.slugname = this.moduleName = data.moduleName;
    }),

    askForGithubUser: yoHelper.askForGithubUser(function(data) {
      this.githubUser = data;
    }),

    askForModuleInfo: function() {
      var done = this.async();

      var prompts = [{
        name: 'description',
        message: 'Description',
        default: 'The best module ever.'
      },{
        name: 'version',
        message: 'Version',
        default: '0.0.0'
      }, {
        name: 'license',
        message: 'License',
        default: 'MIT'
      }, {
        type: 'confirm',
        name: 'skipInstall',
        message: 'Do you need skip npm install?',
        default: false
      }];

      this.prompt(prompts, function(answers) {
        this.answers = answers;
        done();
      }.bind(this));
    }
  },

  configuring: function() {
    var cfg = {srcDir: 'src'};
    cfg.slugname = this.slugname;
    this.config.set(cfg);
  },

  writing: yoHelper.writing(function(from, to) {
    if (to === 'src/jquerify.js') {
      to = 'src/' + this.slugname + '.js';
      this.template(from, to);
      return false;
    }
  }),

  install: function () {
    var skip = this.answers['skipInstall'] || this.options['skip-install'];

    this.installDependencies({
      skipInstall: skip
    });
  }
});
