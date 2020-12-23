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

//商品选中&不选中  /api/cart/checkCart/{skuID}/{isChecked}
export const cartGoodChecked = (skuId, isChecked) => apiAxios.get(`/cart/checkCart/${skuId}/${isChecked}`);

//删除单个商品  /api/cart/deleteCart/{skuId}
export const deleteCart = (skuId) => apiAxios.delete(`/cart/deleteCart/${skuId}`);

//登录注册相关接口
export const login = (phone, password) => apiAxios.post(`user/passport/login`, { phone, password })
export const logout = () => apiAxios.get(`/user/passport/logout`)
export const autoLogin = () => apiAxios.get(`/user/passport/auth/getUserInfo`)
export const register = (phone, password,userCode) => apiAxios.post(`user/passport/register`, { phone, password ,code:userCode})