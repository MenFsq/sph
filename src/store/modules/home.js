import { getBaseCategoryList } from 'http/http';
const OK=200;
export default {
    state: {
        CategoryList:[]
    },
    getters:{},
    mutations: {
        getCategoryList(state,CategoryList) {
          state.CategoryList=CategoryList
        },
    },
    actions: {
        async getCategoryList(store) {
            const { code, data } = await getBaseCategoryList()
            if (code === OK) {
                store.commit('getCategoryList', data.filter((item,index)=>{return index<15}))
            }
            console.log(1)
        }
    }
}