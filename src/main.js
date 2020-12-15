import Vue from 'vue'
import App from './App.vue'

// 引入vuex(仓库)
import store from 'store/index'
// 引入路由环境
import router from 'router/index'

// 引入请求加载动画的相关环境(css文件)
import 'nprogress/nprogress.css'

// 引入mock环境
import 'mock/mock'

Vue.config.productionTip = false

// 全剧组件的注册TypeNav
import TypeNav from 'components/TypeNav/TypeNav'
Vue.component('TypeNav',TypeNav)
// $bus注册
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
