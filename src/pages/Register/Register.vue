<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去
          <router-link to="/Login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
<<<<<<< HEAD
          v-model="userPhone"
          @blur="phoneNumber"
        />
        <span class="error-msg" v-if="phoneNum">请输入正确的11位手机号</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="userCode"
          @blur="codeNumber"
        />
=======
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^[1][3-9][0-9]{9}$/ }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code"
               name="code"
               v-validate="{required: true,regex: /^\d{4}$/}">
>>>>>>> fsq
        <img
          ref="code"
          src="http://182.92.128.115/api/user/passport/code"
          @click="changeCode"
        />
<<<<<<< HEAD
        <span class="error-msg" v-if="codeNum">请输入正确的4位数字验证码</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="userPassword"
          @blur="passwordNumber"
        />
        <span class="error-msg" v-if="passwordNum"
          >请输入正确的密码(由6~12位大/小写字母，数字组合)</span
        >
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"  
          v-model="okPassword"
          @blur="okPasswordNumber"
        />
        <span class="error-msg" v-if="OkPasswordNum"
          >两次输入密码不同,请重新输入密码</span
        >
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" ref="check" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-if="checkNum"
          >请仔细阅读《尚品汇用户协议》并勾选</span
        >
      </div>
      <div class="btn">
        <button @click="overRegister">完成注册</button>
=======
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password"
               name="password"
               v-validate="{required: true,regex: /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}/}">
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码"
               name="confirmPassword"
               v-validate="{required: true,is:password}">
        <span class="error-msg">{{ errors.first('confirmPassword') }}</span>
      </div>
      <div class="controls">
        <input type="checkbox"
               name="checkedone"
               v-model="checked"
               v-validate="{agree:true}">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('checkedone')}}</span>
      </div>
      <div class="btn">
        <button type="button" @click="registerFn">完成注册</button>
>>>>>>> fsq
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapActions } from "vuex";
export default {
  name: "Register",

  data() {
    return {
      userPhone: "",
      userCode: "",
      userPassword: "",
      okPassword: "",
      phoneNum: false,
      codeNum: false,
      passwordNum: false,
      OkPasswordNum: false,
      checkNum: false,
    };
  },

  computed: {},

  methods: {
    ...mapActions(["register"]),

    changeCode() {
      this.$refs.code.src = `http://182.92.128.115/api/user/passport/code?time=${Date.now()}`;
    },

    //匹配电话正则
    phoneNumber() {
      let reg = /^[1][3-9][0-9]{9}$/;
      if (!reg.test(this.userPhone)) {
        this.phoneNum = true;
      } else {
        this.phoneNum = false;
      }
    },

    // 匹配验证码
    codeNumber() {
      let reg = /^\d{4}$/;
      if (!reg.test(this.userCode)) {
        this.codeNum = true;
      } else {
        this.codeNum = false;
      }
    },
    //匹配登录密码
    passwordNumber() {
      let reg = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}/;
      if (!reg.test(this.userPassword)) {
        this.passwordNum = true;
      } else {
        this.passwordNum = false;
      }
    },

    //验证两次密码是否相同
    okPasswordNumber() {
      if (this.userPassword !== this.okPassword) {
        this.OkPasswordNum = true;//如果不同出现提示
      } else {
        this.OkPasswordNum = false;//如果相同不出现提示
      }
    },

    // 点击完成注册
    async overRegister() {
      //判断是否点击同意用户协议
      if (this.$refs.check.checked === false) {
        this.checkNum = true;//如果没有点击就出现提示
      } else {
        this.checkNum = false;//如果点击不出现提示
        if (
          //判断所有信息输入正确再发送请求
          this.checkNum=== true &&
          this.phoneNum === true &&
          this.codeNum === true &&
          this.passwordNum === true &&
          this.OkPasswordNum === true
        ) {
          this.$alert("请根据提示输入正确的用户信息");
        } else {
          try {
            const code  = await this.register({
              phone: this.userPhone,
              password: this.userPassword,
              userCode: this.userCode,
            });
            console.log(code)
            if (code === 200) {
              await this.$router.replace("/Login");//如果返回200就返回登录页
            }else if(code===201){
              await this.$alert("该用户已存在")
            }
          } catch (error) {
            this.$alert("网络异常");
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
=======
// 引入store
import { mapActions } from "vuex";
export default {
  name: "Register",
  //数据
  data() {
    return {
      phone: "", //注册手机号
      code: "", //注册验证码
      password: "", //注册密码
      checked: false, //同意协议
    };
  },

  methods: {
    //引入Actions
    ...mapActions(["register"]),
    // 获取验证码
    changeCode() {
      this.$refs.code.src = `http://182.92.128.115/api/user/passport/code?time=${Date.now()}`;
    },
    // 注册流程
    async registerFn() {
      //所有的注册输入框合法才可以进行注册操作
      const success=await this.$validator.validateAll();
      if(!success) return;

      //注册逻辑
      const {phone,password,code:userCode} =this
      // 发送注册Actions请求
    const {code,data}=await this.register({phone,password,code:userCode})
    if(code===200){
      //注册成功,给提醒
      await this.$alert('注册成功,点击确定后将跳转至登录页面....');
      // 跳转至登录页
      this.$router.replace('/Login')
    }else{
      //注册失败,给提醒
      this.$message({
        message:data,
        type:'error'
      })
      //刷新验证码
      this.changeCode()//this.$refs.code.click()
    }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
>>>>>>> fsq
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

<<<<<<< HEAD
      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
=======
      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
>>>>>>> fsq
      }
    }

<<<<<<< HEAD
    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

=======
>>>>>>> fsq
      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>