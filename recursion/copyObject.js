var arrObj = [
    "test",
    1,
    [2, 3],
    {
      id: 1,
      value: "3",
      testFn:()=>{
          console.log('222')
      }
    },
    [1, [11, 22, [0, 1, 2, 3, [4, [5]]]]],
    () => {
      console.log(111);
    },
  ];
  // var arrObj2 = {
  //   id: 1,
  //   test: "test",
  //   arr: [1, 2, 3, { id: 2, test2: "test2" ,testFn:()=>{console.log('1')}}],
  //   testFn: function () {
  //     console.log("testFn");
  //   },
  // };
  
  function copy(param) {
    let resObj = param.constructor === Object?{}:param.constructor === Array?[]:param;
    for (let key in param) {
      let value = param[key];
      if (param[key].constructor === Object || param[key].constructor === Array) {
        resObj[key] = copy(value);
      } else {
        resObj[key] = value;
      }
    }
    return resObj;
  }
  
  var result = copy(arrObj);
  console.log('递归结果')
  console.log(result);