<!--  -->
<template>
  <div>
    <button @click="test">click me</button>
    <h2>{{house}}</h2>
    <button @click='houseFn("Points warehouse更改")'>点击更改分仓库state</button>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions,
  } from 'vuex';
  export default {
    name: 'test',
    computed: {
      ...mapState({
        house: function (state) {
          return state.house.msg;
        }
      })
    },
    methods: {
      ...mapActions(['test','houseFn']),
    },
  }
</script>

<style scoped>

</style>