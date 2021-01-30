// import { ipcRenderer } from "electron"
import { changeChildArr, changeData, IDataNode, test, IService, TreeNode} from "../charts/DataFuncDepGraph"
import { treeData } from '../charts/DependencyTree'
import { DependencyGraph} from '../charts/DependencyTree';
import { Dashboard} from '../containers/Dashboard'
// describes what the test is
describe('hitting test files', () => {
  // testData: IDataNode;
  // what the specific test is
    it('hits the jest testing', () => {
      // what is expected
      expect(true).toBeTruthy();
    })
  }) 

  describe('snapshot testing', () => {
    it('the dummy data matches the snapshot', () => {
    // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
      expect(test).toMatchSnapshot();
    })

    it('the dependency chart component matches the snapshot', () => {
      // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
      expect(DependencyGraph).toMatchSnapshot();
    })
  })
  //  it('the Dashboard chart component matches the snapshot', () => {
  //   // expect test to match the snapshot in ../_snapshots_/DataFuncDepGraph.test.ts.snap
  //    expect(Dashboard).toMatchSnapshot();
  //  })
  describe('data flow testing', () => {
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