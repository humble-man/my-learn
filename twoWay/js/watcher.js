// 订阅
function Watcher(vm, field, callback) {
    this.vm = vm;
    this.callback = callback;
    this.field = field;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update(){
        this.run();
    },
    run(){
        var value = this.vm.data[this.field];
        var oldVal = this.value;
        if(value != oldVal){
            this.value = value;
            this.callback.call(this.vm,value,oldVal)
        }
    },
    get(){
        Dep.watcher = this;
        var value = this.vm.data[this.field];
        Dep.watcher = null;
    }
}