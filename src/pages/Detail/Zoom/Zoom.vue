<template>
      <div class="swiper">
      <PicZoom
        v-if="goodDetail.skuInfo"
        :url="goodDetail.skuInfo.skuImageList[currentIndex].imgUrl"
        :scale="2"
        :scroll='true'
      ></PicZoom>
      </div>
</template>

<script>
import PicZoom from "vue-piczoom";
import Vue from "vue";
Vue.use(PicZoom);
import { mapState } from "vuex";
export default {
  components: {
    PicZoom,
  },
  name: "Zoom",
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
  methods: {},
  mounted() {
    this.$bus.$on("sendIndexToZoom", (index) => {
      this.currentIndex = index;
    });
  },
};
</script>

<style lang="less">
.mouse-cover-canvas{
  left:750px !important;
  top:240px !important;
  width:400px !important;
}
</style>