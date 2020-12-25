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
        code: "验证码",
        password: "登录密码",
        checkedone: "请仔细阅读协议,"
    },

})
//自定义规则一定要在最后!!!
VeeValidate.Validator.extend('agree', {
    // value:使用了agree规则的输入框中的值
    validate: value => {
        //必须返回true 才代码验证通过
        return value
    },
    getMessage: field => field + '并勾选同意按钮'
})
