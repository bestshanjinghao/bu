import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import LunarFullCalendar from "vue-lunar-full-calendar";
Vue.use(LunarFullCalendar);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
