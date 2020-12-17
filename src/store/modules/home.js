import { getBaseCategoryList, getBanners ,getFloors} from 'http/http';
const OK = 200;
export default {
    state: {
        CategoryList: [],
        banners: [],
        floors:[],
    },
    getters: {},
    mutations: {
        // 三级列表数据
        getCategoryList(state, CategoryList) {
            state.CategoryList = CategoryList
        },
        // 轮播图数据
        getBanners(state, banners) {
            state.banners = banners
        },
        // 楼层数据
        getFloors(state, floors) {
            state.floors = floors
        },
    },
    actions: {
        // 三级列表数据
        async getCategoryList(store) {
            const { code, data } = await getBaseCategoryList()
            if (code === OK) {
                store.commit('getCategoryList', data.filter((item, index) => { return index < 15 }))
            }
            return data;
        },
        // 轮播图数据
        async getBanners(store) {
            const { code, data } = await getBanners()
            if (code === OK) {
                store.commit('getBanners', data)
            }
            return data;
        },
        // 楼层数据
        async getFloors(store) {
            const { code, data } = await getFloors()
            if (code === OK) {
                store.commit('getFloors', data)
            }
            return data;
        }
    }
}