import React from 'react';
import { changeChildArr, changeData, IDataNode, test, IService, TreeNode} from "../charts/DataFuncDepGraph"
import { DependencyGraph,treeData, getLinkComponent, LinkControls  } from '../charts/DependencyTree'
import { SettingsContainer } from '../containers/ServiceSettingsContainer';


// describes what the test is
describe('jest testing is in progress', () => {
  // testData: IDataNode;
  // what the specific test is
    it('jest testing activated', () => {
      // what is expected
      expect(true).toBeTruthy();
    })
  }) 

  describe('jest snapshot testing', () => {
    describe('dependency graph snapshot testing', () => {
      it('the dependency chart component matches the snapshot', () => {
        // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
        expect(DependencyGraph).toMatchSnapshot();
      })

      it('the getLinkComponent component matches the snapshot', () => {
        // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
        expect(getLinkComponent).toMatchSnapshot();
      })

      it('the LinkControls component matches the snapshot', () => {
        // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
        expect(LinkControls).toMatchSnapshot();
      })

    })

    describe('dummy data snapshot testing', () => {
      it('the dummy data matches the snapshot', () => {
      // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
        expect(test).toMatchSnapshot();
      })
      
      it('the altered dummy data matches the snapshot', () => {
        // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
        expect(treeData).toMatchSnapshot();
      })
    })
  })

  describe('jest data parser testing', () => {
    it('Dummy data from /charts/DataFuncDepGraph matches treeData from /charts/DependencyGraph', () => {
      expect(changeData(test)).toEqual(treeData)
    })
  })

// Ground work for mock testing 

// describe('mock test with dummy data', () => {
//   const mockCallback = jest.fn(x => changeChildArr(x));
  // function testChildFunc(items: IService[], callback: (arr: IService[]) => TreeNode[]){
//       callback(items);
//   }
//   testChildFunc(test.services,mockCallback);
//   it('mock test for changeChildArr with dummy data', () => {
//     // The mock function is called twice
//     // expect(mockCallback.mock.calls.length).toBe(1);

//     // The first argument of the first call to the function was 0
//     expect(mockCallback.mock.calls[0][0]).toBe(changeChildArr(test.services)[0]);
//   })

// })


// can use this to check properties on the object that user sends to the backend
// test('onPress gets sent to the backend with the right properties on the event', () => {
//   const onPress = jest.fn();
//   simulatePresses(onPress);
//   expect(onPress).toBeCalledWith(
//     expect.objectContaining({
//       x: expect.any(Number),
//       y: expect.any(Number),
//     }),
//   );
// });

//----- ground work for testing endpoints with promise testing by chai-as-promised -----//
// const chai = require("chai");
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);
// const expect = chai.expect

// it('Promise should pass', function() {
//   return expect(readAndWriteToDB()).to.be.fulfilled
// })

//----- ground work for enzyme testing -----//
// import { shallow } from 'enzyme';
// // import {App} from '../app'; // Introduce the corresponding React component
// describe('Link', () => {
//   it('Renders link to Google', () => {
//     const link:any = shallow(<DependencyGraph/>)
//     expect(true).toBeTruthy();
//   });
// })