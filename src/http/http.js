import apiAxios from './apiAxios';
import mockAxios from './mockAxios';

// 获取三级列表的请求方法
export const getBaseCategoryList = () => apiAxios.get('/product/getBaseCategoryList');

//获取搜索商品数据
export const getGoodsList = (options = {}) => apiAxios.post('/list', options);

// 获取轮播图数据
export const getBanners = () => mockAxios.get('/banners');

//获取楼层数据
export const getFloors = () => mockAxios.get('/floors');

// 获取商品的详情信息
export const getDetail = skyId => apiAxios.get(`/item/${skyId}`)

// 添加购物车
export const addSkuToCart = (skuId, skuNum) => apiAxios.post(`/cart/addToCart/${skuId}/${skuNum}`);

// 获取购物车数据
export const getCartList = () => apiAxios.get(`/cart/cartList`)

//商品选中&不选中
export const cartGoodChecked = (skuId, isChecked) => apiAxios.get(`/cart/checkCart/${skuId}/${isChecked}`);

//删除单个商品
export const deleteCart = (skuId) => apiAxios.delete(`/cart/deleteCart/${skuId}`);

//登录接口
export const login = (phone, password) => apiAxios.post(`user/passport/login`, { phone, password })
//注册接口
export const register = (phone, password, code) => apiAxios.post(`user/passport/register`, { phone, password, code })

//退出登录接口
export const logout = () => apiAxios.get(`/user/passport/logout`)

//自动登录接口
export const autoLogin = () => apiAxios.get(`/user/passport/auth/getUserInfo`)

//获取订单交易页信息接口
export const getTrade = () => apiAxios.get(`/order/auth/trade`);

//获取我的订单列表接口
export const getOrders = (page, limit) => apiAxios.get(`/order/auth/${page}/${limit}`);

//获取订单支付信息(二维码)接口
export const getPayInfo = orderId => apiAxios.get(`/payment/weixin/createNative/${orderId}`);

//查询订单支付状态是否成功
export const getPayState = orderId => apiAxios.get(`/payment/weixin/queryPayStatus/${orderId}`);

//提交订单接口
export const submitOrder = (tradeNo,order) => apiAxios.post(`/order/auth/submitOrder`,{
    data:order,
    params:{tradeNo}
});
