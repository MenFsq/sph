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

// $bus注册
Vue.prototype.$bus = new Vue();

// 引入全局组件
import 'components/components'

// 引入全局css样式
import 'common/css/transition.less'

//引入vee-Validate
import 'util/vee';
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
