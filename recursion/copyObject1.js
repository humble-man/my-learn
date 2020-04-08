var arrObj = [
  "test",
  1,
  [2, 3],
  { id: 1, value: "3" },
  [1, [11, 22, [0, 1, 2, 3, [4, [5]]]]],
  () => {
    console.log("testFn");
  },
];

var arrObj2 = {
  id: 1,
  test: "test",
  arr: [1, 2, 3, { id: 2, test2: "test2" ,testFn:()=>{console.log('1')}}],
  testFn: function () {
    console.log("testFn");
  },
};

function diguiArrObj(param, callBackData) {
  for (var key in param) {
    var paramItem = param[key];
    var itemType = paramItem.constructor;
    if (itemType === Object || itemType === Array) {
      var params = itemType === Object ? {} : [];
      diguiArrObj(paramItem, params);
      callBackData[key] = params;
    } else {
      callBackData[key] = paramItem;
    }
  }
}

var resArrObj = arrObj.constructor === Array ? [] : {};
diguiArrObj(arrObj2, resArrObj);
console.log("递归最终的结果");
console.log(arrObj2);
console.log(resArrObj);
