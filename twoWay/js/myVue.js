function MyVue(options) {
  this.data = options.data;
  this.methods = options.methods;
  observe(this.data);
  new Compile(options.el, this);
}
