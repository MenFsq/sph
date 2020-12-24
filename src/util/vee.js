import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

import zh_CN from 'vee-validate/dist/locale/zh_CN' 
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: () => `您两次输入的密码不一致`  // 修改内置规则的message
    },
    attributes: { // 给校验的field属性名映射中文名称
        phone: '手机号',
        code:"验证码",
        password:"登录密码",
        checked:"协议"
    }
})

