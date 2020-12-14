import Vue from 'vue'
import App from './App.vue'
// 引入路由环境
import router from 'router/index'

// 引入请求加载动画的相关环境(css文件)
import 'nprogress/nprogress.css'

// 引入mock环境
import 'mock/mock'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
