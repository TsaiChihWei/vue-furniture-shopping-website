<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Nav></Nav>
    <div class="banner"></div>

    <div class="container">
      <h3 class="page-title mt-5">
        <i class="far fa-edit mr-2"></i>建立訂單
      </h3>
      <div class="process">
        <div role="alert" class="alert alert-success rounded-pill text-center">
          1. 填寫訂單
        </div>
        <div
          role="alert"
          class="alert step-2 alert-gray rounded-pill text-center"
        >
          2. 確認付款
        </div>
        <div
          role="alert"
          class="alert step-3 alert-gray rounded-pill text-center"
        >
          3. 訂單完成
        </div>
      </div>

      <!-- <div
        class="row align-items-center"
        v-for="item in cart.carts"
        :key="item.id"
      >
        <div
          class="col-4"
          :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
          style="
            height: 100px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          "
        ></div>
        <div class="col-8">
          <div class="title">{{ item.product.title }}</div>
          <div class="price d-flex mt-2">
            <div class="selling-price">
              {{ item.product.price | currency }}
            </div>
          </div>
          <div class="buyingNum input-group mt-2">
            <input
              class="text-center"
              disabled
              style="width: 35px"
              :value="`x ${item.qty}`"
            />
          </div>
        </div>
      </div> -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" colspan="3">訂單明細</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>x  {{ item.qty }}</td>
            <td>{{ item.product.price | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
            <tr class="text-right">
                <td class="total-price" colspan="3">總計 {{ cart.final_total | currency }} 元</td>
            </tr>
        </tfoot>
      </table>
      <!-- 總計 -->
      <!-- <div class="total-price">總計 {{ cart.final_total }} 元</div> -->
      <!-- <div class="text-right">
        <a
          href="#"
          class="btn btn-danger go-checkout btn-lg mt-2"
          @click.prevent="updateCart()"
          >買單去</a
        >
      </div> -->
      <h5>請填寫訂單資料</h5>

    </div>
  </div>
</template>

<script>
import Nav from '../Nav'
export default {
  components: {
    Nav
  },
  data () {
    return {
      cart: {},
      isLoading: false
    }
  },
  methods: {
    getCart () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response.data.data)
        vm.cart = response.data.data
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
.banner {
  height: 200px;
  background-image: url(../../assets/images/banner3.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.page-title {
  padding: 5px 0;
}

.process {
  font-size: 16px;
}
.step-2,
.step-3 {
  display: none;
}
.alert-success {
  color: #000;
  background-color: #7ab3b3a1;
  border-color: #7ab3b3a1;
}
.alert-gray {
  background-color: #f7f7f7;
  border-color: #7ab3b3a1;
}
.selling-price {
  font-size: 18px;
  font-weight: bold;
}
.total-price {
      background: #7ab3b3;
    color: white;
    font-size: 18px;
    font-weight: bold;
}
.btn-danger {
  background-color: #eb8489;
  border-color: #eb8489;
}
@media screen and (min-width: 768px) {
  .process {
    display: flex;
  }
  .step-2 {
    margin-left: 20px;
    margin-right: 20px;
  }
  .alert {
    display: block;
    flex-grow: 1;
  }
}
@media screen and (min-width: 996px) {
  // banner
  .banner {
    height: 600px;
  }
}
</style>
