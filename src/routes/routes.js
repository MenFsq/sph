import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
import Search from 'pages/Search/Search'
import ShopCart from 'pages/ShopCart/ShopCart'
import Detail from 'pages/Detail'
const routes = [
    { path: "/Home", component: Home },
    // 访问登录页和注册页时,Footer不能显示
    { path: "/Login", component: Login, meta: { hideFooter: true } },
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
    {path:'/Detail/:id',component:Detail,props:true},
    { path: "/ShopCart", component: ShopCart },
    { path: "/", redirect: '/Home' },
];
export default routes;