<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper" v-if="goodDetail.skuInfo">
      <div
        class="swiper-slide"
        :key="imageObj.id"
        v-for="(imageObj, index) in goodDetail.skuInfo.skuImageList"
      >
        <img
          :src="imageObj.imgUrl"
          @click="chooseImg(index)"
          :class="{ active: currentIndex === index }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import "swiper/swiper-bundle.min.css";
import Swiper from "swiper/swiper-bundle.min.js";
import { mapState } from "vuex";
export default {
  name: "ImageList",
  data() {
    return {
      //代表当前哪一张图片选中
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState({
      goodDetail: (state) => state.detail.goodDetail,
      
    }),
  },
  methods: {
    chooseImg(index) {
      this.currentIndex = index;
      //向zoom组件传递index
      this.$bus.$emit("sendIndexToZoom", index);
    },
  },
  watch: {
    "goodDetail.skuInfo.skuImageList": {
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
            loop: this.loop, // 循环模式选项
            autoplay: this.autoplay, //开启自动轮播
            slidesPerView: 5, //设置slider容器能够同时显示的slides数量
            slidesPerGroup: 2, //定义slides的数量多少为一组
            pagination: {
              el: ".swiper-pagination",
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
      deep: true,
      // immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>