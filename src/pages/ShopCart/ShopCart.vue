<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartGood in cartList" :key="cartGood.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              @change="changeFn(cartGood.skuId, cartGood.isChecked)"
              :checked="cartGood.isChecked === 1"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartGood.imgUrl" />
            <div class="item-msg">
              {{ cartGood.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartGood.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
              v-model="cartGood.skuNum"
            />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartGood.skuPrice * cartGood.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <button
              class="sindelet"
              @click="deleteCartFn(cartGood.skuName, cartGood.skuId)"
            >
              删除
            </button>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :disabled="cartList.length <= 0"
          v-model="cart_checkAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCartFn">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>&nbsp;{{ cart_goodsNum }}&nbsp;</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">&nbsp;{{ cart_goodsPrice }}&nbsp;</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "ShopCart",

  computed: {
    ...mapState({ cartList: (state) => state.cart.cartList }),
    ...mapGetters(["cart_checkAll", "cart_goodsNum", "cart_goodsPrice"]),
    cart_checkAll: {
      get() {
        return this.$store.getters.cart_checkAll;
      },
      async set(val) {
        //发送请求进行全选操作
        //val : 全选按钮被点击之后的状态
        val = val ? 1 : 0;
        try {
          const codeArr = await this.updateAllChecked(val);
          if (codeArr.every((code) => code === 200)) {
            //同步仓库
            await this.getCartList();
          } else {
            alert("全选操作失败");
          }
        } catch (e) {
          alert("网络问题");
        }
      },
    },
  },

  methods: {
    ...mapActions([
      "getCartList",
      "updateChecked",
      "updateAllChecked",
      "deleteCart",
      "deleteAllCart",
    ]),
    async changeFn(skuId, isChecked) {
      isChecked = isChecked === 0 ? 1 : 0;
      try {
        const code = await this.updateChecked({ skuId, isChecked });
        if (code === 200) {
          //同步仓库
          await this.getCartList();
        } else {
          alert("选中操作失败");
        }
      } catch (e) {
        alert("网络问题");
      }
    },
    async deleteCartFn(name, id) {
      await this.$confirm(`确定要删除 ${name} 吗?`);
      const code = await this.deleteCart(id);
      if (code === 200) {
        await this.getCartList();
      } else {
        this.$alert("删除操作失败");
      }
    },
    async deleteAllCartFn() {
      try {
        const codeArr = await this.deleteAllCart();
        if (codeArr.every((code) => code === 200)) {
          //同步仓库
          await this.$confirm(`确定要删除选中商品吗?`);
          await this.getCartList();
        } else {
          alert("全选操作失败");
        }
      } catch (e) {
        alert("网络问题");
      }
    },
  },

  async created() {
    // 发送请求 获取购物车数据
    const body = await this.getCartList();
    console.log(body);
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 45%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
        }

        .cart-list-con2 {
          width: 45%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>