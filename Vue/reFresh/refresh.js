import Vue from 'vue'

function reFresh(el,binding, type){
  var _this = this
  this.obj = el
  this.touchStart = {
    x: '',
    y: ''
  }
  this.touchLast = {
    x: '',
    y: ''
  }
  var layoutDom = document.createElement('div');
  layoutDom.className = 'layout-wrapper'
  layoutDom.innerHTML = '下拉刷新'
  setTimeout(function () {
    document.querySelector('.refresh').insertBefore(layoutDom,document.querySelector('.ref-content'))
  },500)
  this.touchType = type // 触发的类型
  this.touchMoves = false  // 移动
  this.touchLeave = false  // 离开
  this.touchLong = false // 长按
  this.lastHeight = 0,
  this.layHeight = 50
  this.touchCallBack = binding.value  // 回调函数
  this.obj.addEventListener("touchstart", (e) => {  // 监听touchstart 事件 并触发原型上的相关事件
      _this.start(e)
  }, false)
  this.obj.addEventListener("touchend", (e) => {  // 监听touchend 事件 并触发原型上的相关事件
      _this.end(e)
  }, false)
  this.obj.addEventListener("touchmove", (e) => {  // 监听touchmove 事件 并触发原型上的相关事件
      _this.move(e)
  }, false)
}

reFresh.prototype = {
  start: function(e) {
    e.preventDefault() // 阻止元素发生默认的行为
    this.touchMoves = false  // 移动
    this.touchLeave = false  // 离开
    this.touchLong = false // 长按
    this.touchStart = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    } // changedTouches涉及当前(引发)事件的触摸点的列表-这里取第0个也就是第一个
    this.time = setTimeout(function() {
        if (!this.touchLeave && !this.touchMoves) {
            this.touchType == "longTouch" && this.touchCallBack(e);
            this.touchLong = true;
            console.log('长按事件')
        };
    }.bind(this), 1000); // bind（this） 防止setTimeout 里面的this指向改变
  },
  move: function (e) {
    this.touchMoves=true
    this.touchLeave = false  // 离开
    this.touchLong = false // 长按
    this.touchLast = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
    var disY = this.touchLast.y - this.touchStart.y
    var end = false
    this.layoutWrapper = document.querySelector('.layout-wrapper')
    this.layoutWrapper.style.transition = 'none'
    if(disY>=0){
      this.lastHeight = disY
      this.layoutWrapper.style.height = this.lastHeight + 'px'
      this.layoutWrapper.style.fontSize = this.lastHeight/10 + 'px'
      if(disY>=80){
        this.layoutWrapper.innerText = '释放立即刷新...'
      }
    }
  },
  end: function (e) {
    var disY = this.touchLast.y - this.touchStart.y
    var end = true;
    clearTimeout(this.time);
    if (!this.touchLong && !this.touchMoves) {
        this.touchType == "tap"
        this.touchLeave = true
        console.log('点击事件')
    }else if(this.touchLong&&!this.touchMove){
      this.vueLeave = false
    }else{
      var lastHeight = 0
      this.vueLeave = false
      this.layoutWrapper = document.querySelector('.layout-wrapper')
      this.layoutWrapper.innerText = '刷新中...'
      this.layoutWrapper.style.transition = '0.3s all'
      this.layoutWrapper.style.fontSize = this.layHeight/10 + 'px'
      this.layoutWrapper.style.height = this.layHeight + 'px'
      setTimeout(function (){
         this.lastHeight = 0
         this.layoutWrapper.style.transition = 'none'
        this.layoutWrapper.style.height = this.lastHeight + 'px'
        this.layoutWrapper.innerText = '下拉刷新'
      }.bind(this), 1500)
      this.touchCallBack()
    }
  }
}

// 注册全局指令  有疑问请参考vue官网api 全局注册指令 https://cn.vuejs.org/v2/guide/custom-directive.html
Vue.directive("move",{
  bind:function(el, binding) {
    new reFresh(el, binding, "move");
  }
})