import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import home from 'store/modules/home'
import search from 'store/modules/search'
import detail from 'store/modules/detail'
import cart from 'store/modules/cart'
import user from 'store/modules/user'
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        home,
        search,
        detail,
        cart,
        user
    }
})
export default store;