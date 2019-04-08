import Vue from 'vue'

function reFresh(el, binding, type) {
	var _this = this
	this.obj = el //绑定move事件的元素
	this.touchStart = { //鼠标（手指）第一次的点击位置坐标
		x: '',
		y: ''
	}
	this.touchLast = { //鼠标（手指）最后一次的点击位置坐标
		x: '',
		y: ''
	}
	this.scrollTop = document.documentElement.scrollTop
	var layoutDom = document.createElement('div'); //创建一个新的div(下拉之后显示下拉内容的容器)
	layoutDom.className = 'layout-wrapper' //给新创建的div添加class
	layoutDom.innerHTML = '下拉刷新' //给新创建的div添加文本内容

	//初始化之后将新创建的div添加到指定的容器内（定时器是为了防止dom没有渲染完成无法获取到dom）
	setTimeout(function() {
		document.querySelector('.refresh').insertBefore(layoutDom, document.querySelector('.ref-content'))
	}, 500)

	this.touchType = type // 触发的类型
	this.touchMoves = false // 移动
	this.touchLeave = false // 离开
	this.touchLong = false // 长按
	this.lastHeight = 0 // 下拉的最远距离
	this.layHeight = 50 // 创建的div的最终高度 （显示下拉刷新内容的容器高度）
	this.touchCallBack = binding.value // 传递过来的回调函数（指定元素绑定的事件）
	this.obj.addEventListener("touchstart", (e) => { // 监听touchstart 事件 并触发原型上的相关事件  并且调用原型上的start事件
		_this.start(e)
	}, false)
	this.obj.addEventListener("touchend", (e) => { // 监听touchend 事件 并触发原型上的相关事件  并且调用原型上的end事件
		_this.end(e)
	}, false)
	this.obj.addEventListener("touchmove", (e) => { // 监听touchmove 事件 并触发原型上的相关事件  并且调用原型上的move事件
		_this.move(e)
	}, false)
}

reFresh.prototype = { // 重定义reFresh的原型
	//鼠标（手指）点击（触碰）屏幕
	start: function(e) {
		e.preventDefault() // 阻止元素发生默认的行为
		this.touchMoves = false // 移动
		this.touchLeave = false // 离开
		this.touchLong = false // 长按
		this.scrollTop = document.documentElement.scrollTop
		this.touchStart = {
			x: e.changedTouches[0].pageX,
			y: e.changedTouches[0].pageY
		} // changedTouches涉及当前(引发)事件的触摸点的列表-这里取第0个也就是第一个

		this.time = setTimeout(function() { // 鼠标按下之后如果超过一秒视为长按事件
			if(!this.touchLeave && !this.touchMoves) { // 鼠标没有离开并且没有移动
				this.touchType == "longTouch"
				this.touchLong = true;
				console.log('长按事件')
			};
		}.bind(this), 1000); // bind（this） 防止setTimeout 里面的this指向改变

	},
	//鼠标（手指）在点击（触碰）之后移动
	move: function(e) {
		this.touchMoves = true // 移动
		this.touchLeave = false // 离开
		this.touchLong = false // 长按
		this.touchLast = { // 实时记录鼠标（手指）移动的最后的坐标
			x: e.changedTouches[0].pageX,
			y: e.changedTouches[0].pageY
		}
		var disY = this.touchLast.y - this.touchStart.y //  鼠标（手指）下移距离为最后的纵坐标减去最开始的纵坐标
		if(this.scrollTop<=0){
			this.layoutWrapper = document.querySelector('.layout-wrapper') //  获取下拉刷新内容的容器
			this.layoutWrapper.style.transition = 'none' //  将属性变化的动画设为none
			if(disY >= 0) {
				this.lastHeight = disY
				this.layoutWrapper.style.height = this.lastHeight + 'px'
				this.layoutWrapper.style.fontSize = this.lastHeight / 20 + 'px'
				if(disY >= 80) {
					this.layoutWrapper.innerText = '释放立即刷新...'
				}
			}			
		}
	},
	end: function(e) {
		var disY = this.touchLast.y - this.touchStart.y //  鼠标（手指）下移距离为最后的纵坐标减去最开始的纵坐标
		clearTimeout(this.time); // 清除定时器
		if(this.scrollTop<=0) {
			if(!this.touchLong && !this.touchMoves) { // 没有长按并且没有移动视为点击事件
				this.touchType == "tap"
				this.touchLeave = true
				console.log('点击事件')
			} else if(this.touchLong && !this.touchMove) { //  长按并且移动了不做任何处理
				this.vueLeave = false
			} else if(disY >= 0 && disY >= this.layHeight) { //没有长按并且发生了移动  实现下拉刷新容器的展开动画
				var lastHeight = 0
				this.vueLeave = false
				this.layoutWrapper = document.querySelector('.layout-wrapper')
				this.layoutWrapper.innerText = '刷新中...'
				this.layoutWrapper.style.transition = '0.3s all'
				this.layoutWrapper.style.fontSize = this.layHeight / 10 + 'px'
				this.layoutWrapper.style.height = this.layHeight + 'px'
				setTimeout(function() {
					this.lastHeight = 0
					this.layoutWrapper.style.transition = 'none'
					this.layoutWrapper.style.height = this.lastHeight + 'px'
					this.layoutWrapper.innerText = '下拉刷新'
				}.bind(this), 1500)
				this.touchCallBack()
			} else if(disY >= 0 && disY < this.layHeight) {
				this.layoutWrapper.style.height = '0px'
			}
		}
	}
}

// 注册全局指令  有疑问请参考vue官网api 全局注册指令 https://cn.vuejs.org/v2/guide/custom-directive.html
Vue.directive("move", {
	bind: function(el, binding) {
		new reFresh(el, binding, "move");
	}
})