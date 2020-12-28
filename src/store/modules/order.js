import { getTrade, getOrders, getPayInfo, getPayState, submitOrder } from 'http/http'
const OK = 200;
export default {
    state: {
        tradeInfo:{}, //交易信息
        orderInfo:{}, //订单信息
        payInfo:{}    //支付信息
    },
    getters:{},
    mutations: {
        //交易信息
        getTradeInfo(state,tradeInfo){
            state.tradeInfo = tradeInfo
        },

        //订单信息
        getOrderInfo(state,orderInfo){
            state.orderInfo = orderInfo
        },

        //支付信息
        getPayInfo(state,payInfo){
            state.payInfo = payInfo
        }
    },
    actions: {
        //获取订单交易页信息接口
        async getTradeInfo({commit}) {
            const {code, data} = await getTrade();
            if (code === OK)
                commit("getTradeInfo", data);

            return data
        },

        //获取我的订单列表接口
        async getOrderInfo({ commit }, { page, limit}) {
            const { code, data } = await getOrders(page, limit);
            if (code === OK)
                commit("getOrders", data);

            return data
        },

        //获取订单支付信息(二维码)接口
        async getPayInfo({commit},orderId) {
            const {code, data} = await getPayInfo(orderId);
            if (code === OK)
                commit("getPayInfo", data);

            return data
        },
        //查询订单支付状态是否成功
        async getPayState(store,orderId) {
            const { code } = await getPayState(orderId);
            if (code === OK)
            return code
        },
        //提交订单接口
        async submitOrder(store, { tradeNo,order}) {
            const {code,data} = await submitOrder(tradeNo,order);
            if (code === OK)
            return {code,data}
        },
    }
}