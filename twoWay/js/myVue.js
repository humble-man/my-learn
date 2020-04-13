function MyVue(options) {
  this.data = options.data;
  this.methods = options.methods;

  Object.keys(this.data).forEach((key)=>{
    this.init(key);
  });

  observe(this.data);
  new Compile(options.el, this);
}

MyVue.prototype = {
  init(key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return this.data[key];
      },
      set: function setter(newVal) {
        this.data[key] = newVal;
      },
    });
  },
};
