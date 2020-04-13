// 监听器
function Observer(data) {
  this.data = data;
  this.init(data);
}
Observer.prototype = {
  // 初始化-劫持对象中的所有数据
  init(data) {
    Object.keys(data).forEach((key) => {
      this.defineProperty(data, key, data[key]);
    });
  },
  // 调用Object.defineProperty劫持数据
  defineProperty(data, key, val) {
    // 判断传入的值是否还是对象，是的话继续递归劫持数据
    var childObj = observe(val);
    var dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true, //当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
      configurable: true, //当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
      get: function getter() {
        if(Dep.watcher){
          dep.addW(Dep.watcher)
        }
        return val;
      },
      set: function setter(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notice();
      },
    });
  },
};

//供外部调用初始化监听器的方法
function observe(value) {
  // 判断是否为对象，只有对象才需要监听
  if (!value || typeof value != 'object') {
      return;
  }
  return new Observer(value);
};

// 订阅者容器
function Dep(){
    this.watchers = [];
}
Dep.prototype = {
  addW(watcher){
    this.watchers.push(watcher)
  },
  notice(){
    this.watchers.forEach(watcher=>{
      watcher.update();
    })
  }
}
Dep.watcher = null;