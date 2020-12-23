import { getUUID } from "util"
import {login,logout,autoLogin,register} from "http/http"
const OK =200;
export default {
    state:{
        uuid: getUUID(),
        userInfo:{}//用户信息
    },
    getters:{

    },
    mutations:{
        login(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        //登录请求
        async login({ commit }, {phone, password}) {
            const { code, data } = await login(phone,password)
            if (code === OK) {
                commit('login',data)
            }
            return {code,data};
        },
        //退出登录请求
        async logout() {
            try {
                const { code } = await logout();
                return code
            } catch (error) {
                throw new Error(error)
            }
        },
        //自动登录请求
        async autoLogin() {
            try {
                const { code } = await autoLogin();
                return code
            } catch (error) {
                throw new Error(error)
            }
        },
        //注册请求
        async register(store, {phone, password ,userCode}) {
            try {
                const { code } = await register(phone, password ,userCode);
                return code
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}