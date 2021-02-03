const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// ------ TODO: needs to wait for window to load ----- //

// make the path for electron
var electronPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron');

// if process is windows, add .cmd
if (process.platform === 'win32') {
  electronPath += '.cmd';
}

let appPath = path.join(__dirname, '..', '..');

let app = new Application({
            path: electronPath,
            args: [appPath]
        });
        describe('Application launch', function() {
          this.timeout(20000)})
       // using "chaiAsPromised" for async functions   
        global.before(function () {
          chai.should();
          chai.use(chaiAsPromised);
      });
    //   before(function () {
    //     chaiAsPromised.transferPromiseness = app.transferPromiseness;
    //     return app.start();      
    //  });

// open the electron app before each test
      describe('Test Example', function () {
        beforeEach(function () {
            return app.start();
        });
      
// close the electron app after each test
        afterEach(function () {
            return app.stop();
        });
        // afterAll(() => {
        //   if (app && app.isRunning()) {
        //     return app.stop();
        //   }
        // });
        
        it('opens a window', function () {
          return app.client.waitUntilWindowLoaded()
            .getWindowCount().should.eventually.equal(2);
        });

        it('Shows an initial window', async () => {
          await app.client.waitUntilWindowLoaded();
          const count = await app.client.getWindowCount();
          assert.equal(count, 1);
        });
      
      });