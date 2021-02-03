const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var electronPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
  electronPath += '.cmd';
}

let appPath = path.join(__dirname, '..', '..');

let app = new Application({
            path: electronPath,
            args: [appPath]
        });

        global.before(function () {
          chai.should();
          chai.use(chaiAsPromised);
      });
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

        it('Shows an initial window', async () => {
          await app.client.waitUntilWindowLoaded();
          const count = await app.client.getWindowCount();
          assert.equal(count, 1);
        });
      
      });