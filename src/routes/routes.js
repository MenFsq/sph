/* eslint-disable no-unused-vars */
import Home from 'pages/Home/Home'
import store from 'store'
// import Login from 'pages/Login/Login'
// import Register from 'pages/Register/Register'
// import Search from 'pages/Search/Search'
// import ShopCart from 'pages/ShopCart/ShopCart'
// import Detail from 'pages/Detail'
// import AddCartSuccess from 'pages/AddCartSuccess'
// const Home = () => import(/* webpackChunkName: "Home" */ 'pages/Home/Home')
const Register = () => import(/* webpackChunkName: "Register" */ 'pages/Register/Register')
const Search = () => import(/* webpackChunkName: "Search" */ 'pages/Search/Search')
const ShopCart = () => import(/* webpackChunkName: "ShopCart" */ 'pages/ShopCart/ShopCart')
const Detail = () => import(/* webpackChunkName: "Detail" */ 'pages/Detail')
const AddCartSuccess = () => import(/* webpackChunkName: "AddCartSuccess" */ 'pages/AddCartSuccess')
const Login = () => import(/* webpackChunkName: "Login" */ 'pages/Login/Login')
const Trade = () => import(/* webpackChunkName: "Login" */ 'pages/Trade')
const Pay = () => import(/* webpackChunkName: "Login" */ 'pages/Pay')
const PaySuccess = () => import(/* webpackChunkName: "Login" */ 'pages/PaySuccess')
const Center = () => import(/* webpackChunkName: "Login" */ 'pages/Center')
const routes = [
    { path: "/Home", component: Home },
    // 访问登录页和注册页时,Footer不能显示
    {
        path: "/Login",
        component: Login,
        meta: { hideFooter: true },
        async beforeEnter(to, from, next){
            // ...当处于登录状态时,不允许再次访问登录页
            const userInfo = await store.state.user.userInfo;
            if (userInfo.name) {
                //登录状态
                next('/')
            } else {
                //未登录状态 直接放行
                next();
            }
        }
    },
    { path: "/Register", component: Register, meta: { hideFooter: true } },
    {
        path: "/Search/:keyWord?", component: Search, name: 'Search', props: (route) => ({
            keyword: route.params.keyWord,
            categoryName: route.query.categoryName,
            category1Id: route.query.category1Id,
            category2Id: route.query.category2Id,
            category3Id: route.query.category3Id
        })
    },
    { path: '/AddCartSuccess', component: AddCartSuccess, props:route=>({skuNum:route.query.skuNum})},
    { path: '/Detail/:id', component: Detail, props:true},
    { path: "/ShopCart", component: ShopCart },
    {
        path:"/Trade",
        component: Trade,
        async beforeEnter(to, from, next){
            // ...只能从购物车列表跳转过来
            if (from.path.split('/')[1].toLowerCase() === 'shopcart') {
                next();
            } else {
                next('/ShopCart');
            }
        }
    },
    {
        path:"/Pay",
        component: Pay,
        async beforeEnter(to, from, next){
            // ...只能从Trade交易组件跳转过来!!!
            if (from.path.split('/')[1].toLowerCase() === 'trade') {
                next();
            } else {
                next('/ShopCart');
            }
        }
    },
    {
        path:"/PaySuccess",
        component: PaySuccess,
        async beforeEnter(to, from, next){
            // ...只能从支付组件跳转过来
            if (from.path.split('/')[1].toLowerCase() === 'pay') {
                next();
            } else {
                next('/ShopCart');
            }
        }
    },
    {
        path:"/Center",
        component: Center,
    },
    { path: "/", redirect: '/Home' },
];
export default routes;