import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from 'routes/routes.js';
Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 }
        // return 期望滚动到哪个的位置
      }
})