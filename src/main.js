import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css' // 引入全局样式
import ElementUI from 'element-ui'
// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI) // 你的项目就有了很多组件名可以直接使用

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
