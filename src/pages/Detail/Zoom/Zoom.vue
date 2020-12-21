<template>
  <div class="spec-preview">
    <img v-if="goodDetail.skuInfo" :src="goodDetail.skuInfo.skuImageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="move" ref="event"></div>
    <div class="big">
      <img v-if="goodDetail.skuInfo" ref="bigImage"
           :src="goodDetail.skuInfo.skuImageList[currentIndex].imgUrl" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "Zoom",
    data(){
        return{
            //代表当前哪一张图片选中
            currentIndex:0
        }
    },
    computed:{
        ...mapState({
            goodDetail:state => state.detail.goodDetail
        })
    },
    methods:{
        move(ev){
          //拿到遮罩 & 大图
          let mask = this.$refs.mask;
          let eventNode = this.$refs.event;
          let bigImage = this.$refs.bigImage;
          let maskX = ev.offsetX - (mask.offsetWidth/2);
          let maskY = ev.offsetY - (mask.offsetHeight/2);

          if(maskX<0){maskX=0}
          if(maskX>(eventNode.offsetWidth - mask.offsetWidth)){maskX=eventNode.offsetWidth - mask.offsetWidth}
          if(maskY<0){maskY=0}
          if(maskY>(eventNode.offsetHeight - mask.offsetHeight)){maskY=eventNode.offsetHeight - mask.offsetHeight}

          mask.style.left = maskX +"px";
          mask.style.top = maskY +"px";
          bigImage.style.left = -2*maskX +"px";
          bigImage.style.top = -2*maskY +"px";
        }
    },
    mounted(){
        this.$bus.$on("sendIndexToZoom",(index)=>{
            this.currentIndex = index
        })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>