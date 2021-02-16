<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Nav></Nav>
    <AlertMessage></AlertMessage>
    <div class="banner"></div>
    <div class="container row">
      <div class="col-12 col-md-6">
        <div
          class="pic"
          :style="{ backgroundImage: `url(${product.imageUrl})` }"
        ></div>
      </div>
      <div class="col-12 col-md-6">
        <table class="table table-borderless">
          <thead>
            <tr style="font-size: 30px">
              <th colspan="2">{{ product.title }}</th>
            </tr>
          </thead>
          <tbody style="color: #777777; font-weight: 500; letter-spacing: 2px">
            <tr>
              <td colspan="2">
                <del>{{ product.origin_price | currency }}</del>
                <strong class="text-info" style="font-size: 24px">{{
                  product.price | currency
                }}</strong>
              </td>
            </tr>
            <tr>
              <td style="width: 90px">產品介紹</td>
              <td>
                {{ product.content }}
              </td>
            </tr>
            <tr>
              <td>材質描述</td>
              <td>
                {{ product.description }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="buyingNum input-group mt-3">
          <button
            class="btn btn-outline-primary btn-sm"
            style="width: 35px; font-weight: bold"
            @click="adjustQty(false)"
          >
            -
          </button>
          <input
            class="text-center"
            disabled
            style="width: 35px"
            :value="productQty"
          />
          <button
            class="btn btn-outline-primary btn-sm"
            style="width: 35px; font-weight: bold"
            @click="adjustQty(true)"
          >
            +
          </button>
          <div class="self-total text-info" v-if="productQty > 1">
            小計：{{ (product.price * productQty) | currency }}
          </div>
        </div>
        <button
          type="button"
          class="btn btn-info btn-block mt-2"
          @click="addtoCart(productId, productQty)"
        >
          加到購物車
        </button>
      </div>
    </div>
    <Warning></Warning>
  </div>
</template>

<script>
import Nav from '../Nav'
import AlertMessage from '../AlertMessage'
import Warning from '../Warning'
export default {
  components: {
    Nav,
    AlertMessage,
    Warning
  },
  data () {
    return {
      productId: '',
      product: {},
      productQty: 1,
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${this.productId}`
      this.$http.get(url).then((response) => {
        vm.product = response.data.product
        console.log(response)
        this.isLoading = false
      })
    },
    adjustQty (addOrMinor) {
      if (addOrMinor) {
        this.productQty++
      } else {
        if (this.productQty === 1) return
        this.productQty--
      }
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((response) => {
        console.log(response)
        vm.isLoading = false
        this.$bus.$emit('message:push', '商品已加入購物車！', 'info')
      })
    }
  },
  created () {
    this.productId = this.$route.params.productId
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 40px auto 0;
}
.banner {
  height: 170px;
  background-image: url(../../assets/images/banner2.jpg);
  background-size: cover;
  background-position: center bottom;
}
.pic {
  height: 150px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.self-total {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  font-weight: bold;
}
@media screen and (min-width: 768px) {
  .pic {
    height: 100%;
  }
}
</style>
