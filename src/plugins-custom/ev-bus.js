export const evBus = {
  install(Vue) {
    Vue.prototype.$evBus = new Vue();
  },
};
