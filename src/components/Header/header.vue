<!--  -->
<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>{{ userInfo.name }}&nbsp;&nbsp;</span>
            <a href="javascript:;" @click="logoutFn">登出</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/Login">登录</router-link>
            <router-link to="/Register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/Center">我的订单</router-link>
          <router-link to="/ShopCart">我的购物车</router-link>
          <a href="javascript:;">我的尚品汇</a>
          <a href="javascript:;">尚品汇会员</a>
          <a href="javascript:;">企业采购</a>
          <a href="javascript:;">关注尚品汇</a>
          <a href="javascript:;">合作招商</a>
          <a href="javascript:;">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/Home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyWord: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    ...mapActions(["logout"]),
    toSearch() {
      let localtion = {
        name: "Search",
      };
      if (Object.keys(this.$route.query).length !== 0) {
        localtion.query = this.$route.query;
      }
      if (this.keyWord) {
        localtion.params = {
          keyWord: this.keyWord,
        };
      }
      if (this.$route.path.toLowerCase().startsWith("/search")) {
        console.log(this.$route.path);
        this.$router.replace(localtion);
      } else {
        this.$router.push(localtion);
      }
    },
    async logoutFn() {
      //登出
      await this.logout();
      //回主页
      this.$router.replace("/");
    },
  },
  mounted() {
    this.$bus.$on("clearHInput", (val) => {
      this.keyWord = val;
    });
  },
  watch: {
    keyWord(val) {
      this.$bus.$emit("keywordNull", val);
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>