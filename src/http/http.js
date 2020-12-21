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
export const getDetail =skyId=>apiAxios.get(`/item/${skyId}`)