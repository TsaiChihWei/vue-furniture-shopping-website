<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Nav></Nav>
    <div class="banner"></div>

    <div class="container">
      <h3 class="page-title mt-5"><i class="far fa-edit mr-2"></i>建立訂單</h3>
      <div class="process">
        <div role="alert" class="alert alert-success rounded-pill text-center">
          1. 填寫訂單
        </div>
        <div
          role="alert"
          class="alert step-2 alert-success rounded-pill text-center"
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

      <!-- <table class="table table-striped" style="border-top: 3px solid #7ab3b3;">
        <thead>
          <tr>
            <th scope="col" colspan="3">訂單資料</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td :style="{ backgroundImage: `url(${item.product.imageUrl})` }" style="
            height: 70px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          "
          ></td>
            <td class="align-middle">{{ item.product.title }}<br>x {{ item.qty }}</td>
            <td class="align-middle text-right">{{ item.final_total | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-right">
            <td class="total-price" colspan="3">
              總計 {{ cart.final_total | currency }} 元
            </td>
          </tr>
        </tfoot>
      </table> -->
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
      order: {},
      orderId: '',
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${this.orderId}`
      this.$http.get(url).then(res => {
        this.order = res.data.order
        this.isLoading = false
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>

<style lang="scss" scoped>
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
.table {
  width: 60%;
  margin: 20px auto 0;
}
.total-price {
  background: #7ab3b3;
  color: white;
  font-size: 16px;
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
