import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from 'routes/routes.js';
import store from 'store/index.js';
Vue.use(VueRouter);

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
    // return 期望滚动到哪个的位置
  }
})

//全局路由守卫
//引入校验配置
import config from 'config/config'
let { paths } = config;
paths = paths.map(path => path.toLowerCase())

//前置路由守卫
let flag = true;
router.beforeEach(async (to, from, next) => {
  //flag:只有刷新的时候才需要执行
  if (flag) {
    flag = false;
    //校验token是否有效 (自动登录请求 只有刷新的时候才需要执行)
    const code = await store.dispatch("autoLogin")
    if (code !== 200) {
      //代表token过期  自动登出!!
      await store.dispatch("logout")
    }
  }
  next()
})

router.beforeResolve(async (to, from, next) => {
  let userInfo = store.state.user.userInfo;
  if (userInfo.name) {
    next();
  } else {
    let toPath = to.path.split("/")[1].toLowerCase();
    if (paths.includes(toPath)) {
      next('/Login')
    } else {
      next();
    }
  }
})
export default router