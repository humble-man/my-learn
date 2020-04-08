var arrObj = [
  "test",
  1,
  [2, 3],
  { id: 1, value: "3" },
  [1, [11, 22, [0, 1, 2, 3, [4, [5]]]]],
  ()=>{
	  console.log('testFn')
  }
];

// var arrObj = {
// 	id:1,
// 	test:'test',
// 	arr:[1,2,3,{id:2,test2:'test2'}],
// 	testFn:function(){
// 		console.log('testFn')
// 	}
// }

function diguiArrObj(param, callBackData) {
  var type = param.constructor;
  if (type === Array) {
    param.forEach((item, index) => {
	  var itemType = item.constructor;
      if (itemType === String) {
        callBackData[index] = item;
      }
      if (itemType === Number) {
        callBackData[index] = item;
      }
      if (itemType === Array) {
        var itemArr = [];
        diguiArrObj(item, itemArr);
        callBackData[index] = itemArr;
      }
      if (itemType === Object) {
        var itemObj = {};
        diguiArrObj(item, itemObj);
        callBackData[index] = itemObj;
	  }
	  if (itemType === Function) {
		  callBackData[index] = item;
      }
    });
  }
  if (type === Object) {
    for (key in param) {
      var paramItem = param[key];
      var itemType = paramItem.constructor;
      if (itemType === String) {
        callBackData[key] = paramItem;
      }
      if (itemType === Number) {
        callBackData[key] = paramItem;
      }

      if (itemType === Array) {
        var itemArr = [];
        diguiArrObj(paramItem, itemArr);
        callBackData[key] = itemArr;
      }
      if (itemType === Object) {
        var itemObj = {};
        diguiArrObj(paramItem, itemObj);
        callBackData[key] = itemObj;
	  }
	  if (itemType === Function) {
		callBackData[key] = paramItem;
	}
    }
  }
}

var resArrObj = arrObj.constructor === Array ? [] : {};
diguiArrObj(arrObj, resArrObj);
console.log("递归最终的结果 --- " + JSON.stringify(resArrObj));
console.log(resArrObj);
resArrObj.testFn();