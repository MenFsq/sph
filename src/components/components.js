//全局组件的注册
import Vue from "vue"
import TypeNav from "components/TypeNav/TypeNav"
import Carousel from "components/Carousel/Carousel"
import OrderButton from "components/OrderButton/OrderButton"
import { Pagination } from 'element-ui';
Vue.component("TypeNav",TypeNav)
Vue.component("Carousel",Carousel)
Vue.component(Pagination.name, Pagination);
Vue.component("OrderButton", OrderButton);