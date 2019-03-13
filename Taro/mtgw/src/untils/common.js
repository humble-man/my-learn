//根据传过来的菜品信息 统计当前菜品的数据信息
//根据Taro提供的js编写数据缓存（适配h5 小程序）
import Taro from '@tarojs/taro'
import Event from './events' //导入事件池（事件管理器）

const foodKey = "taro_test" //缓存数据的关键词
let myEvent = new Event();  //实例化事件管理器
export function getFoodCount(food) {
	let store = Taro.getStorageSync(foodKey); //获取关键字的缓存数据信息
	if(store && store[food.id]) {
		console.log('存在数据缓存')
		return store[food.id].num;
	} else { 
		console.log('不存在数据缓存')
		return 0;
	}
}

//设置商品的数量  加减商品时
//参数  指定的菜品  当前的数量  操作类型
//数量为0 删除菜品数量结构  增加数量时	新增菜品数量结构
export function setFoodCount(food, num, type, callBack) {
	if(food) {
		let store = Taro.getStorageSync(foodKey);  //获取缓存数据
		if(!store) store = {};
		//类型为减
		if(type == "cut") {
			//数量为1删除数据结构 
			if(num == 1) {
				if(store[food.id]) {
					delete store[food.id];
				}
			} else { // 添加数据结构
				if(store[food.id]) {
					store[food.id].num = num - 1;
				}
			}
			Taro.setStorageSync(foodKey, store);
			callBack && callBack();
		}
		//类型为加
		
		if(type == "add") {
			if(store[food.id]) {
				store[food.id].num = num + 1;
			} else {  //添加数据结构  es6语句 给对象添加属性
				store[food.id] = {
					num: 1,
					...food
				};
			}
			Taro.setStorageSync(foodKey, store);
			callBack && callBack();
		}
	}
}
export function getEvent(){ //给外部提供事件管理器
	return myEvent;
}

export function getAllFoodInfo(){  //获取缓存的商品信息数据给购物车
	let store = Taro.getStorageSync(foodKey);
	let allNum = 0;
	let allPrice = 0;
	if(store){
		Object.keys(store).map((key)=>{ //es6语句
			allNum += store[key].num;
			allPrice += store[key].num*store[key].price
		})
	}
	return {allNum,allPrice}
}
