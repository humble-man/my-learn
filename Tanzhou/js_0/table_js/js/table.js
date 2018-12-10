//不允许直接暴露全局变量
//IIFE(函数自执行)
//给开发者提供使用插件的入口（暴露一个全局变量给开发者使用）
//必须考虑插件的运行环境以及插件的引入模式

//知识点:所有的全局变量  实际上是挂载到全局对象中的 例如（浏览器中window  node环境中global）
//知识点：IIFE 中一般都是用来判断插件的引入方式以及运行的环境


//创建自执行函数  接收两个参数 （obj == this ,  factory == 定义好的方法）

//(function(接收参数一,接收参数二){
//	
//})(传递参数一,传递参数二);


(function(obj,factory){
	
	//判断是否是浏览器环境或者说判断当前的全局对象是否为window/global
	if(!obj.frames){
		throw "该环境不是浏览器环境，请更换您的运行环境"
	}
	
	//当前全局对象的Table属性为 factory 方法
	obj.Table = factory();
})(this,function(){
	//写入防止方法重写的自定义函数
	
	//判断是否未初始化值和空值  返回 true || false
	function isUndef(){
		return t === undefined || t === null;
	}
	
	
	//返回结果  （arg 为接收到的所有参数集合）
	return function(arg){
		
		//判断是否存在参数
		if(!arg){
			throw '必须传入指定的参数';
		}
		
		//定义相对变量  
		var TableNode = arg.el,  //绑定的元素标签
			TableHead = arg.head,  //表格的表头
			TableData = arg.data;  //表格的数据
			
		//创建表格
		var tableEn = document.createElement('table');
		tableEn.width = "100%";
		tableEn.style = "text-align:center;";
		TableNode.appendChild(tableEn);
		
		//创建表头 thead
		var thead = document.createElement('thead');
		tableEn.appendChild(thead);
		
		
		//遍历表头的数据
		TableHead.forEach(function(hName){
			var td = document.createElement('td');
			td.innerHTML = hName;
			thead.appendChild(td);
		})
		
		
		
		//遍历表格数据
		var tbody = document.createElement('tbody');
		tableEn.appendChild(tbody);
		TableData.forEach(function(data_json){
			var tr = document.createElement('tr');
			
			//Object.keys(json)  返回数组
			Object.keys(data_json).forEach(function(key){
				var td = document.createElement('td');
				td.innerHTML = data_json[key];
				tr.appendChild(td);
			})
			
			tbody.appendChild(tr);
		})
	}
});
