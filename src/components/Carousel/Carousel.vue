<template>
  <!--banner轮播-->
  <div ref="swiper" class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in list" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper的样式文件
import "swiper/swiper-bundle.min.css";
import Swiper from "swiper/swiper-bundle.min.js";
export default {
  name: "ListContainer",
  props: {
    list: Array,
    loop: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    list: {
      immediate: true,
      deep: true,
      handler() {
        if (this.list.length == 0) {
          return;
        }
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
            loop: this.loop, // 循环模式选项
            autoplay: this.autoplay, //开启自动轮播
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>