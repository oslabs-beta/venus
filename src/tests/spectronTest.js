/* eslint-env node, mocha */
// const assert = require('assert');
// const path = require('path');
// const {Application} = require('spectron');
const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var electronPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '..');

var app = new Application({
            path: electronPath,
            args: [appPath]
        });

      //   global.before(function () {
      //     chai.should();
      //     chai.use(chaiAsPromised);
      // });
    //   before(function () {
    //     chaiAsPromised.transferPromiseness = app.transferPromiseness;
    //     return app.start();      
    //  });
      // describe('Application launch', function() {
      //   this.timeout(20000);

      describe('Test Example', function () {
        beforeEach(function () {
            return app.start();
        });
      
        afterEach(function () {
            return app.stop();
        });
      
        it('opens a window', function () {
          return app.client.waitUntilWindowLoaded()
            .getWindowCount().should.eventually.equal(1);
        });
      
        it('tests the title', function () {
          return app.client.waitUntilWindowLoaded()
            .getTitle().should.eventually.equal('Hello World!');
        });
      
      });