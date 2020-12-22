import { getDetail } from 'http/http'
const OK = 200;
export default {
    state: {
        goodDetail: {},
    },
    getters: {
        checkedAttrs(state){
            let attrs = []
            state.goodDetail.spuSaleAttrList && state.goodDetail.spuSaleAttrList.forEach((attr)=>{
                attr.spuSaleAttrValueList.forEach((val)=>{
                    if(val.isChecked === "1"){
                        attrs.push(val)
                    }
                })
            })
            return attrs
        }
    },
    mutations: {
        getDetail(state, goodDetail) {
            state.goodDetail = goodDetail
        },
        activeFn(state, { attrIndex, valIndex }) {
            //attrIndex 属性对应的下标
            //valIndex  属性值对应的下标
            state.goodDetail.spuSaleAttrList.forEach((attr, index) => {
                if (attrIndex === index) {
                    //找到对应的属性 将其所有值的isChecked状态置为"0"
                    attr.spuSaleAttrValueList.forEach((val) => {
                        val.isChecked = "0"
                    })
                }
            })

            //将选中那一条置为1
            state.goodDetail.spuSaleAttrList[attrIndex].spuSaleAttrValueList[valIndex].isChecked = "1"
        }
    },
    actions: {
        async getDetail({ commit }, skuid) {
            const { code, data } = await getDetail(skuid)
            if (code === OK) {
                commit('getDetail', data);
                return data
            }
        },
        async activeFn({ commit }, { attrIndex, valIndex }) {
            commit('activeFn', { attrIndex, valIndex })
        }
    }
}