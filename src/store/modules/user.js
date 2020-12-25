import { getUUID } from "util"
import { login, logout, autoLogin, register } from "http/http"
const OK = 200;
export default {
    state: {
        uuid: getUUID(),
        userInfo: {}//用户信息
    },
    getters: {

    },
    mutations: {
        login(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        //以下三个action都要修改仓库中的userInfo
        async login({ commit }, { phone, password }) {
            try {
                const { code, data, message } = await login(phone, password);
                if (code === OK) {
                    //提交mutation 修改仓库数据
                    commit("login", data)
                    //将返回的token存在浏览器的本地存储中
                    window.localStorage.setItem("sph_token", data.token)
                }
                return { code, data, message }
            } catch (e) {
                throw new Error(e)
            }
        },
        async logout({ commit }) {
            try {
                const { code } = await logout();
                if (code === OK) {
                    //提交mutation 修改仓库数据
                    commit("login", {})
                    //清除本地存储中的token
                    window.localStorage.removeItem("sph_token")
                }
                return code
            } catch (e) {
                throw new Error(e)
            }
        },
        async autoLogin({ commit }) {
            try {
                const { code, data } = await autoLogin();
                if (code === OK) {
                    //提交mutation 修改仓库数据
                    commit("login", data)
                }
                return code
            } catch (e) {
                throw new Error(e)
            }
        },
        //注册请求
        async register(store, { phone, password, code: registerCode }) {
            try {
                const { code, data } = await register(phone, password, registerCode);
                return { code, data }
            } catch (e) {
                throw new Error(e)
            }
        }
    }
}