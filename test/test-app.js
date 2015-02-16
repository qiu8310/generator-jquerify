'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('jquerify:app', function () {
  before(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('jquerify:app', [
        '../../app'
      ]);

      this.app.options['skip-install'] = true;
      helpers.mockPrompt(this.app, {
        moduleName: 'xxMoraTest',
        username: 'qiu8310',
        description: 'description',
        version: '1.0.0',
        license: 'MIT',
        skipInstall: true
      });
      this.app.run({}, function () {
        done();
      });
    }.bind(this));

    //helpers.run(path.join(__dirname, '../app'))
    //  .inDir(path.join(os.tmpdir(), './temp-test'))
    //  .withOptions({ 'skip-install': true })
    //  .withPrompt({
    //    moduleName: 'xxMoraTest',
    //    username: 'qiu8310',
    //    description: 'description',
    //    version: '1.0.0',
    //    license: 'MIT',
    //    skipInstall: true
    //  })
    //  .on('end', done);
  });




  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
