var arr = [1,2,3,4,5,[11,22,33,[111,222,333,444,555]]];

// 普通数组递归
function diguiArr(param, callBackData) {
  var isArr = param.constructor === Array;
  if (isArr && param.length > 0) {
    param.forEach((item, index) => {
		if(item.length>1){
			var array = [];
			diguiArr(item,array);
			callBackData[index] = array;
		}else{
			callBackData[index] = item;
		}
	});
  }else{
	console.log('请传入正确的数组')
  }
}

var resArr = [];
diguiArr(arr, resArr);
console.log('普通数组递归结果 --- '+JSON.stringify(resArr))