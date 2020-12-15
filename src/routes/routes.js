import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
import Search from 'pages/Search/Search'
import ShopCart from 'pages/ShopCart/ShopCart'
const routes = [
    { path: "/Home", component: Home },
    // 访问登录页和注册页时,Footer不能显示
    { path: "/Login", component: Login, meta: { hideFooter: true } },
    { path: "/Register", component: Register, meta: { hideFooter: true } },
    { path: "/Search/:keyWord?", component: Search, name: 'Search' },
    { path: "/ShopCart", component: ShopCart },
    { path: "/", redirect: '/Home' },
];
export default routes;