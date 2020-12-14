<!--  -->
<template>
  <div>
    test
  </div>
</template>

<script>
  import {
    getBaseCategoryList,
    getBanners,
    getFloors
  } from 'http/http.js'

  export default {
    name: 'test',
    async created() {
      const body = await getBaseCategoryList();
      const banners = await getBanners();
      console.log(banners);
      const floors = await getFloors();
      console.log(floors);
    }
  }
</script>

<style scoped>

</style>