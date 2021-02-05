<template>
  <div>
    <Nav></Nav>
    <Main></Main>
    <Footer></Footer>
    <Warning></Warning>
  </div>
</template>

<script>
import Nav from './Nav'
import Main from './Main'
import Footer from './Footer'
import Warning from './Warning'

export default {
  components: {
    Nav,
    Main,
    Footer,
    Warning
  },
  name: 'Home',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">

</style>
