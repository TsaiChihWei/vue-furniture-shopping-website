<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      // const api = 'https://vue-course-api.hexschool.io/api/weitsai/products'
      // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
      // this.$http.get(api).then((response) => {
      //   console.log(response)
      // })
    },
  }
</script>

<style lang="scss">
  @import "./assets/all.scss";
</style>