<template>
  <div>
    <Nav></Nav>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
  import Nav from './Nav'
  import Main from './Main'
  import Footer from './Footer'

  export default {
    components: {
      Nav,
      Main,
      Footer,
    },
    name: 'Home',
    data() {
      return {

      }
    },
  }
</script>


<style lang="scss">
  
</style>