<template>
  <div>
    <Nav :cartCount="cartNum"></Nav>
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
      cartNum: ''
    }
  },
  methods: {
    getCart () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.cartNum = response.data.data.carts.length
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">

</style>
