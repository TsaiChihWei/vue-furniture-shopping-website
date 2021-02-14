<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Nav></Nav>
    <div class="banner"></div>

    <!-- 購物車內容 -->
    <div
      class="container"
      v-if="cart.carts !== undefined && cart.carts.length > 0"
    >
      <h3 class="page-title mt-5">
        <i class="fas fa-shopping-cart mr-2"></i>購物車內容
      </h3>
      <div
        class="row align-items-center"
        v-for="item in cart.carts"
        :key="item.id"
      >
        <div
          class="col-3"
          :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
          style="
            height: 100px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          "
        ></div>
        <div class="col-7">
          <div class="title">{{ item.product.title }}</div>
          <div class="price d-flex mt-2">
            <del class="original-price mr-1">{{
              item.product.origin_price | currency
            }}</del>
            <div class="selling-price">
              {{ item.product.price | currency }}
            </div>
          </div>
          <div class="buyingNum input-group mt-2">
            <button
              class="btn btn-outline-primary btn-sm"
              :attribute="{ disabled: item.qty === 1 }"
              style="width: 35px; font-weight: bold"
              @click="adjustQty(false, item.id)"
            >
              -
            </button>
            <input
              class="text-center"
              disabled
              style="width: 35px"
              :value="item.qty"
            />
            <button
              class="btn btn-outline-primary btn-sm"
              style="width: 35px; font-weight: bold"
              @click="adjustQty(true, item.id)"
            >
              +
            </button>
          </div>
        </div>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            @click="removeCartItem(item.id, item.qty)"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <!-- 優惠碼 -->
      <div class="input-group mb-3 input-group-sm mt-4">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-info coupon-input" type="button">
            套用優惠碼
          </button>
        </div>
      </div>

      <!-- 總計 -->
      <div class="total-price">總計 {{ cartTotalPrice | currency }} 元</div>
      <div class="text-right">
        <a
          href="#"
          class="btn btn-info go-checkout btn-lg mt-2"
          @click.prevent="updateCart()"
          >買單去</a
        >
      </div>
    </div>

    <!-- 如果購物車為空時 -->
    <div
      class="container"
      v-if="cart.carts !== undefined && cart.carts.length === 0"
    >
      <h3 class="page-title mt-5">
        <i class="fas fa-shopping-cart mr-2"></i>購物車內容
      </h3>
      <h5 class="reminder text-center mt-5 font-weight-bold">
        您的購物車是空的！再去逛逛吧？
      </h5>
      <div class="text-center mt-5">
        <routerLink
          class="btn btn-primary btn-lg"
          to="/products"
          style="color: #fff"
          >購物商場<i class="ml-2 fas fa-angle-double-right"></i
        ></routerLink>
      </div>
    </div>
    <Warning></Warning>
  </div>
</template>

<script>
import Nav from '../Nav'
import Warning from '../Warning'
export default {
  components: {
    Nav,
    Warning
  },
  data () {
    return {
      isLoading: false,
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      tempCart: {}
    }
  },
  methods: {
    getCart () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data
        vm.isLoading = false
      })
    },
    adjustQty (addOrMinor, id) {
      const currentData = this.cart.carts.find((element) => element.id === id)
      if (addOrMinor) {
        currentData.qty++
      } else {
        if (currentData.qty === 1) return
        currentData.qty--
      }
    },
    createOrder () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      const order = vm.form
      vm.isLoading = true
      this.$http.post(url, { data: order }).then((response) => {
        console.log('訂單已建立', response)
        // if (response.data.success) {
        //     vm.$router.push(`/customer_checkout/${response.data.orderId}`)
        // }
        vm.isLoading = false
      })
    },
    updateCart () {
      this.isLoading = true
      const toDelArrId = []
      const toAddArr = []
      const allDelAjex = []
      const allAddAjex = []
      this.cart.carts.forEach((element) => {
        toDelArrId.push(element.id)
        toAddArr.push({
          product_id: element.product_id,
          qty: element.qty
        })
      })
      toDelArrId.forEach((element) => {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${element}`
        allDelAjex.push(new Promise((resolve) => {
          resolve(this.$http.delete(url).then((response) => {}))
        }))
      })

      // 刪除購物車的所有項目
      Promise.all(allDelAjex).then(res => {
        console.log('allDelAjex 成功')
        // 將更新過後的購物車項目重新加回
        toAddArr.forEach((element) => {
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
          allAddAjex.push(new Promise(resolve => {
            resolve(this.$http.post(url, { data: element }).then((response) => {}))
          }))
        })
        Promise.all(allAddAjex).then(res => {
          console.log('allAddAjex 成功')
          this.isLoading = false
          this.$router.push('/customer_order')
        })
      }).catch(err => console.log(err, 'allDelAjex 發送失敗'))
    },
    removeCartItem (id) {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(url).then((response) => {
        vm.getCart()
        console.log(response)
        vm.isLoading = false
      })
    }
  },
  computed: {
    cartTotalPrice () {
      let total = 0
      if (this.cart.carts) {
        this.cart.carts.forEach((element) => {
          total += element.qty * element.product.price
        })
      }
      return total
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 200px;
  background-image: url(../../assets/images/living_room.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.page-title {
  border-bottom: 2px solid;
  padding: 5px 0;
}
.row {
  margin: 0;
  border-bottom: 1px solid #dee2e6;
  padding: 10px 0 10px;
}
.price {
  align-items: baseline;
}
.original-price {
  color: #aaa;
}
.selling-price {
  font-size: 18px;
  font-weight: bold;
}
.total-price {
  text-align: right;
  font-weight: bold;
  font-size: 24px;
}
// .btn-danger {
//   background-color: #eb8489;
//   border-color: #eb8489;
// }
.go-checkout {
  font-weight: bold;
}
// 如果購物車為空時
.reminder {
  color: #7ab3b3;
}

@media screen and (min-width: 996px) {
  // banner
  .banner {
    height: 600px;
  }
  // 購物車 padding
  .container {
    width: 50%;
  }
}
</style>
