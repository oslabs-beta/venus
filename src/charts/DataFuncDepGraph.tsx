// this is the kind of type of the tree node
interface IByMethod {
    GET?: IService;
    POST?: IService;
    PUT?: IService;
    PATCH?: IService;
}

interface IService {
    service?:string;
    status: string;
    load: string;
    response_time: number;
    error: number;
    availability: number;
    byMethod?: IByMethod

}

interface IDataNode {
    services: IService[];
  }

const test: IDataNode = {
    services: [
        {
            service: 'gogle api',
            status: 'good',
            load: '1.00 hpm',
            response_time:1266,
            error: 0,
            availability: 100,
            byMethod: {
                GET: {
                    status: 'good',
                    load: '0.33 hpm',
                    response_time: 1200,
                    error: 0,
                    availability:100
                }
            }
        },
        {
            service: 'wizard api',
            status: 'fair',
            load: '1.00 hpm',
            response_time:1266,
            error: 0,
            availability: 100,
            byMethod: {
                GET: {
                    status: 'bad',
                    load: '0.33 hpm',
                    response_time: 1200,
                    error: 0,
                    availability:100
                },
                POST: {
                    status: 'bad',
                    load: '0.33 hpm',
                    response_time: 1200,
                    error: 0,
                    availability:100
                },
            }
        }
    ]
}

/* ----------- CHANGE CHILD ARRAY ---------- */

function changeChildArr(arr: IService[]): TreeNode[]{
    // make a new array with map
    // we will be putting the services inside the array
    const newArr = arr.map( (obj: any) => {
        // declare a variable for the req method objects
        const objReqs = []
        // create request types objs to be put in the req methods array for each endpoint obj
        for (let key in obj.byMethod){
            const reqType: TreeNode = {
            // declare the service type to a service key
            service: key,
            // declare the status type to the status of that req method
            // I purposely declared the obj as "any" type so I could turn the key to a string here
            status: obj.byMethod[key].status}
            // push to req methods array for each endpoint obj
            objReqs.push(reqType)
        }
        // the new Obj for each service w/ type
        const newObj: TreeNode = {
            service: obj.service,
            status: obj.status
           }

 /* -----------THIS IS WHERE YOU WOULD CHANGE "children" to "methods" ------- */
 
         // put the requests in as a "children" key
         
        newObj.children = objReqs
        // return the object to the array
        return newObj
    })
    // return the array
    return newArr
}

// console.log('change arr', changeChildArr(test.services))
let children = changeChildArr(test.services)[0]
console.log('children', children)
// console.log(test.services);

/* ----------- CHANGE MAIN ARRAY --------- */
// this is the kind of type of the tree node
interface TreeNode {
    service: string;
    status: string;
    isExpanded?: boolean;
    children?: TreeNode[];
  }

function changeData(obj: IDataNode): TreeNode{
    let result: TreeNode = {
    // create the main node and its children using helper function
            service: "Services",
            status: "good",
            children: changeChildArr(obj.services)
          }
    return result
    }

const treeData = changeData(test)

// const treeData: TreeNode = {
//     service: "CodeSmith",
//     status: "good",
//     children: [
//       {
//         service: "Google API",
//         status: "good",
//         children: [
//           { service: "GET",
//           status: "bad"},
//           { service: "POST",
//           status: "good" },
//           { service: "PUT",
//           status: "fair" },
//           { service: "DEL",
//           status: "good" },
//           ]
//       },
//       {
//         service: "Plaid API",
//         status: "good",
//         children: [
//           { service: "PUT",
//           status: "good" },
//           { service: "DEL",
//           status: "good"},
//           ]
//       },
//       {
//         service: "Solarwinds API",
//         status: "fair",
//         children: [
//           { service: "GET",
//           status: "good" }
//           ]
//       },
//       {
//         service: "Surfline API",
//           status: "fair",
//         children: [
//           { service: "GET",
//           status: "bad" },
//           { service: "POST",
//           status: "fair" },
//           { service: "PUT",
//           status: "good" },
//           { service: "DEL",
//           status: "fair" },
//           ]
//       },
//       {
//         service: "Yelp API",
//         status: "bad",
//         children: [
//           { service: "GET",
//           status: "bad" },
//           { service: "POST",
//           status: "good" },
//           { service: "PUT",
//           status: "good" },
//           { service: "DEL",
//           status: "good" },
//           ]
//       },
//     ]
//   };

  export { changeChildArr, changeData, test, treeData, IDataNode, IService, TreeNode}