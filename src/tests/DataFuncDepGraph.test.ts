import React from 'react';
import { changeChildArr, changeData, IDataNode, test, IService, TreeNode} from "../charts/DataFuncDepGraph"
import { DependencyGraph,treeData, getLinkComponent, LinkControls  } from '../charts/DependencyTree'
import { SettingsContainer } from '../containers/ServiceSettingsContainer';

// describes what the test is
describe('jest testing is in progress', () => {
  // what the specific test is
    it('jest testing activated', () => {
      // what is expected
      expect(true).toBeTruthy();
    })
  }) 

describe('jest snapshot testing', () => {
  describe('dependency graph snapshot testing', () => {
    it('the dependency chart component matches the snapshot', () => {
      expect(DependencyGraph).toMatchSnapshot();
    })

    it('the getLinkComponent component matches the snapshot', () => {
        expect(getLinkComponent).toMatchSnapshot();
    })

    it('the LinkControls component matches the snapshot', () => {
      expect(LinkControls).toMatchSnapshot();
    })
  })

  describe('dummy data snapshot testing', () => {
    it('the dummy data matches the snapshot', () => {
      expect(test).toMatchSnapshot();
    })
    
    it('the dummy data matches the snapshot', () => {
      expect(treeData).toMatchSnapshot();
    })
  })
})

describe('jest data parser testing', () => {
  it('dummy data ran through parser correctly matches post parser chart data', () => {
    expect(changeData(test)).toEqual(treeData)
  })

  describe('jest data child array parser testing', () => {
    it('check if first element from result array exists', () => {
      expect(changeChildArr(test.services)[0]).toBeTruthy();
    })

    it('check if result array is an object', () => {
      expect(typeof changeChildArr(test.services)).toBe('object');
    })
 
    it('check if first element from result array is an object', () => {
      expect(typeof changeChildArr(test.services)).toBe('object');
    })

    it('check if first element from result array has "service" property', () => {
      expect(changeChildArr(test.services)[0]).toHaveProperty('service')
    })

    it('check if first element from result array has "status" property', () => {
      expect(changeChildArr(test.services)[0]).toHaveProperty('status')
    })

    it('check if first element from result array has "children" property', () => {
      expect(changeChildArr(test.services)[0]).toHaveProperty('children')
    })

    it('check if dummy data result array from child parser has length of 2', () => {
      console.log(changeChildArr(test.services))
      expect(changeChildArr(test.services)).toHaveLength(2)
    })
  })
})

/** why we are not using interface in our jest testing file
 * https://stackoverflow.com/questions/48813882/testing-typescript-interface-with-jest
 */

//--------Ground work for mock testing---------//

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


