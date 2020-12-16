<template>
  <div id="app">
    <V-Header></V-Header>
    <router-view></router-view>
    <V-Footer v-show="!$route.meta.hideFooter"></V-Footer>
  </div>
</template>

<script>
import Header from "components/Header/header.vue";
import Footer from "components/Footer/Footer.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  async created() {
    await this.getCategoryList();
    await this.getBanners();
  },
  methods: {
    ...mapActions(["getCategoryList",'getBanners']),
  },
  components: {
    "V-Header": Header,
    "V-Footer": Footer,
  },
};
</script>

<style scoped>
</style>