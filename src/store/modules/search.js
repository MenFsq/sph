const OK = 200;
import { getGoodsList } from 'http/http'
export default {
    state: {
        goodsList: {}//包含search中的所有数据
    },
    getters: {},
    mutations: {
        getGoodsList(state, goodsList) {
            state.goodsList = goodsList
        },
    },
    actions: {
        /* 
        "keyword",
    "categoryName",
    "category1Id",
    "category2Id",
    "category3Id",
        */
        async getGoodsList({ commit },opction) {
            const { code, data } = await getGoodsList(opction);
            if (code == OK) {
                commit('getGoodsList', data)
            }
            return data;
        }
    }
}