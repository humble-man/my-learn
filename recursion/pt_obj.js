var obj = {
	id:1,
	value:'1',
	childer:{
		id:2,
		value:'1-1',
		childer:{
			id:3,
			value:'1-1-1'
		}
	}
}

function diguiObj(param,callBackData){
	var isObj = param.constructor === Object;
	if(isObj){
		for(key in param){
			callBackData[key] = param[key];
			if(param[key]&&param[key].constructor === Object){
				var object = {};
				diguiObj(param[key],object);
				callBackData.childer = object;
			}
		}
	}else{
		console.log('请传入正确的对象')
	}
}

var resObj = {};
diguiObj(obj,resObj)
console.log('普通对象的递归结果 --- '+JSON.stringify(resObj))