<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./assets/all.scss";
  html, body {
    font-family: 'Noto Serif TC', serif;
  }
</style>
