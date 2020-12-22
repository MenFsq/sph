import { addSkuToCart, getCartList, cartGoodChecked, deleteCart } from "http/http";
const OK = 200;
export default {
    state: {
        cartList: [],
    },
    getters: {
        //全选状态
        cart_checkAll(state,) {
            let flag = 0;
            state.cartList.forEach((cartGood) => {
                if (cartGood.isChecked === 1) {
                    flag++;
                }
            });
            return state.cartList.length>=1 && flag === state.cartList.length;
        },
        // 选中商品的数量
        cart_goodsNum(state) {
            let flag = 0;//商品总数量
            state.cartList.forEach((cartGood) => {
                if (cartGood.isChecked === 1) {
                    flag += cartGood.skuNum;
                }
            });
            return flag
        },
        // 选中商品的总价
        cart_goodsPrice(state) {
            let flag = 0;//商品总价格
            state.cartList.forEach((cartGood) => {
                if (cartGood.isChecked === 1) {
                    flag += (cartGood.skuNum * cartGood.skuPrice);
                }
            });
            return flag
        }

    },
    mutations: {
        getCartList(state, cartList) {
            state.cartList = cartList
        }
    },
    actions: {
        // 添加购物车
        async addSkuToCart(store, { skuId, skuNum }) {
            try {
                const { code } = await addSkuToCart(skuId, skuNum);
                return code
            } catch (e) {
                throw new Error(e)
            }
        },

        // 获取购物车列表
        async getCartList({ commit }) {
            const { code, data } = await getCartList();
            if (code == OK) {
                commit('getCartList', data)
                return data
            }
        },
        //选中操作(发请求 修改数据库中的数据)
        async updateChecked(store, { skuId, isChecked }) {
            //发送了选中请求
            try {
                const { code } = await cartGoodChecked(skuId, isChecked)
                return code
            } catch (e) {
                throw new Error(e)
            }
        },
        //全选操作(发请求 修改数据库中的数据 依赖于单选的请求)
        async updateAllChecked(store, allChecked) {
            //allChecked : 全选按钮当前的状态  0:没选中;1:选中
            //当前购物车中选中状态与 allChecked 不一致的都得换成allChecked
            const all = []
            store.state.cartList.forEach((cartGood) => {
                if (cartGood.isChecked !== allChecked) {
                    //发请求 修改当商品的选中状态
                    let promise = store.dispatch("updateChecked", { skuId: cartGood.skuId, isChecked: allChecked });
                    all.push(promise)
                }
            })
            return Promise.all(all)
        },
        //删除 (发请求 修改数据库中的数据)
        async deleteCart(store, skuId) {
            //发送了选中请求
            try {
                const { code } = await deleteCart(skuId)
                return code
            } catch (e) {
                throw new Error(e)
            }
        },
         //批量删除 (发请求 修改数据库中的数据 依赖于单删的请求)
         async deleteAllCart(store){
            const all = []
            store.state.cartList.forEach((cartGood)=>{
                if(cartGood.isChecked === 1){
                    //发请求 修改当商品的选中状态
                    let promise = store.dispatch("deleteCart",cartGood.skuId);
                    all.push(promise)
                }
            })
            return Promise.all(all)
        },
    }
}