<!--  -->
<template>
  <div>
    <button @click="test">click me</button>
  </div>
</template>

<script>
  export default {
    name: 'test',
    methods: {
      test(){
        this.$store.dispatch('test')
      },
    },
  }
</script>

<style scoped>

</style>