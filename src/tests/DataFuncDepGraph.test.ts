import { ipcRenderer } from "electron"
import { changeChildArr, changeData, test, treeData } from "../charts/DataFuncDepGraph"

describe('hitting test files', () => {
  it('hits the jest testing', () => {
    expect(true).toBeTruthy();
  })
}) 

it('the dummy data matches the snapshot', () => {
  expect(test).toMatchSnapshot();
})
console.log(test)
