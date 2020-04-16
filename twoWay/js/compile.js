// 解析器

function Compile(elName, vm) {
  // 感觉传入的节点id获取节点
  this.elName = elName;
  this.el = document.querySelector(elName);
  // 节点绑定的对象
  this.vm = vm;
  // 设定虚拟节点
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  // 初始化
  init() {
    // 判断页面中是否存在id对应的元素节点
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileEl(this.fragment);
      // 将虚拟节点添加到获取到的节点中
      this.el.appendChild(this.fragment);
    } else {
      alert("找不到id为" + this.elName.substring(1) + "的元素节点");
    }
  },

  // 创建虚拟节点，并将找到的真实节点添加到虚拟节点
  nodeToFragment(el) {
    var fragment = document.createDocumentFragment();
    // 查找节点下的子元素，如果存在子元素则递归讲所有子元素都添加到虚拟节点里头
    var child = el.firstChild;
    while (child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },

  // 解析基本第一步-递归遍历节点map调用对应的解析方法解析
  compileEl(el) {
    var childNode = el.childNodes;
    // 因为childNode 是一个 map 无法使用forEach 所以调用Array上的原型链方法转成数组再调用
    [].slice.call(childNode).forEach((node) => {
      // 正则 - 匹配 {{xxx}}
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;
      if (this.isTextNode(node) && reg.test(text)) {
        this.compileTextNode(node, reg.exec(text)[1]);
      } else if (this.isElementNode(node)) {
        this.compileElNode(node);
      }
      if (node.childNodes && node.childNodes.length) {
        this.compileEl(node);
      }
    });
  },
  // 解析元素节点
  compileElNode(node) {
    // 获取元素节点拥有的属性集合
    var attrArr = node.attributes;
    Array.prototype.forEach.call(attrArr, (attr) => {
      var attrName = attr.name;
      // 判断是否为v-命令
      if (this.isVCommand(attrName)) {
        var field = attr.value;
        var commandName = attrName.substring(2);
        // 判断指令为v-on 或者 v-model 执行对应的解析
        if (this.isEventCommand(commandName)) {
          this.compileOn(node, this.vm, field);
        } else if (this.isModelCommand(commandName)) {
          // v-model 指令
          this.compileModel(node, this.vm, field);
        } else if (this.isHtmlCommand(commandName)) {
          // v-model 指令
          this.compileHtml(node, this.vm, field);
        }
        // node.removeAttribute(attrName);
      }
    });
  },
  // 解析v-html
  compileHtml(node,vm,field){
    var value = vm[field];
    this.updataHtmlVal(node,value);
    new Watcher(vm,field,(val)=>{
      this.updataHtmlVal(node,val)
    })
  },
  // 更新html的值
  updataHtmlVal(node,val){
    node.innerHTML = typeof val == "undefined" ? "您没有绑定v-html值" : val;
  },
  // 解析v-on指令节点
  compileOn(node, vm, fnName) {
    var eventType = "click";
    var fn = vm.methods && vm.methods[fnName];
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },
  // 解析v-model指令节点
  compileModel(node, vm, field) {
    var value = vm[field];
    this.updateModelVal(node, value);
    new Watcher(vm, field, (val) => {
      this.updateModelVal(node, val);
    });
    node.addEventListener("input", (e) => {
      var newValue = e.target.value;
      if (value === newValue) {
        return;
      }
      vm[field] = newValue;
      value = newValue;
    });
  },
  // 更新指令绑定的值
  updateModelVal(node, val) {
    node.value = typeof val == "undefined" ? "" : val;
  },
  // 解析文本节点
  compileTextNode(node, field) {
    var fieldArr = field.split(".");
    var initText = this.vm;
    fieldArr.forEach((key) => {
      initText = initText[key];
    });
    this.updataText(node, initText);
    new Watcher(this.vm, field, (val) => {
      this.updataText(node, val);
    });
  },
  // 更新文本
  updataText(node, val) {
    node.textContent = typeof val == "undefined" ? "" : val;
  },
  // 判断是否为元素节点
  isElementNode: function (node) {
    return node.nodeType == 1;
  },
  // 判断是否为文本节点
  isTextNode(node) {
    return node.nodeType == 3;
  },
  // 判断是否为v-指令
  isVCommand(name) {
    return name.indexOf("v-") == 0;
  },
  // 判断是否为v-on指令
  isEventCommand(name) {
    return name.indexOf("on:") == 0;
  },
  // 判断是否为v-model指令
  isModelCommand(name) {
    return name.indexOf("model") == 0;
  },
  // 判断是否为v-model指令
  isHtmlCommand(name) {
    return name.indexOf("html") == 0;
  }
};
