function MyVue(options) {
  this.data = options.data;
  observe(this.data);
  new Compile(options.el, this);
}
