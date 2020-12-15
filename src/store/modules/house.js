export default {
    state: {
        msg: 'Points warehouse'
    },
    getters: {},
    mutations: {
        houseFn(state,test) {
            state.msg =test
        }
    },
    actions: {
        houseFn(store,test) {
            store.commit('houseFn', test)
        }
    },
}