<!--  -->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="wrapLeave" @mouseenter="wrapEnter">
        <h2 class="all" @mouseenter="allEnter">全部商品分类</h2>
        <transition name="item">
          <div class="sort" @click="toSearch" v-show="showOnelevel">
            <div class="all-sort-list2">
              <div
                class="item"
                :class="{ showList: currenIndex === index }"
                v-for="(item, index) in CategoryList"
                :key="item.categoryId"
                @mouseenter="itemEnter(index)"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-categoryName="item.categoryName"
                    :data-categoryId1="item.categoryId"
                    >{{ item.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="childItem in item.categoryChild"
                      :key="childItem.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="childItem.categoryName"
                          :data-categoryId2="childItem.categoryId"
                          >{{ childItem.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="childChildItem in childItem.categoryChild"
                          :key="childChildItem.categoryId"
                        >
                          <a
                            href="javascript:;"
                            :data-categoryName="childChildItem.categoryName"
                            :data-categoryId2="childChildItem.categoryId"
                            >{{ childChildItem.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle.js";
export default {
  name: "TypeNav",
  data() {
    return {
      currenIndex: -2,
      showOnelevel: ["/", "/Home"].includes(this.$route.path),
      keywordNull: "",
    };
  },
  computed: {
    ...mapState({
      CategoryList(state) {
        return state.home.CategoryList;
      },
    }),
  },
  methods: {
    allEnter() {
      if (!["/", "/Home"].includes(this.$route.path)) {
        this.showOnelevel = true;
      }
    },
    wrapLeave() {
      this.currenIndex = -2;
      if (!["/", "/Home"].includes(this.$route.path)) {
        this.showOnelevel = false;
      }
    },
    wrapEnter() {
      this.currenIndex = -1;
    },
    itemEnter: throttle(function (index) {
      if (this.currenIndex > -2) {
        this.currenIndex = index;
      }
    }, 250),
    toSearch(e) {
      const {
        categoryname = "",
        categoryid1 = "",
        categoryid2 = "",
        categoryid3 = "",
      } = e.target.dataset;
      let location = {
        name: "Search",
        query: {},
        hash: `#${Date.now()}`,
      };
      categoryname ? (location.query.categoryName = categoryname) : "";
      categoryid1 ? (location.query.category1Id = categoryid1) : "";
      categoryid2 ? (location.query.category2Id = categoryid2) : "";
      categoryid3 ? (location.query.category3Id = categoryid3) : "";

      if (Object.keys(this.$route.params).length !== 0) {
        location.params = this.$route.params;
      }
      if(this.keywordNull===''){
        if(location.params&& typeof location.params==='object'){
          let arr=Object.keys(location.params);
          if(arr.length===1&&arr[0]==='keyWord'){
            location.params=''
          }else{
            delete location.params.keyword;
          }
        }
      }
      // console.log(location)
      this.$router.push(location);
      this.showOnelevel = false;
    },
  },
  mounted() {
    this.$bus.$on("keywordNull", (val) => {
      this.keywordNull = val;
    });
  },
};
</script>

<style  scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.showList {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>