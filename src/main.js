import Vue from 'vue'
import App from '@/App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import yModule from './index.js'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })
Vue.use(yModule)
window.v = new Vue({
  render: h => h(App)
}).$mount('#app')
