<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Nav></Nav>
    <div class="banner"></div>

    <div class="container">
      <h3 class="page-title mt-5"><i class="far fa-edit mr-2"></i>建立訂單</h3>
      <div class="process">
        <div
          role="alert"
          class="alert step-1 alert-info rounded-pill text-center"
        >
          1. 填寫訂單
        </div>
        <div
          role="alert"
          class="alert step-2 alert-info rounded-pill text-center"
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

      <table class="table" style="border-top: 3px solid #7ab3b3">
        <thead class="thead-light">
          <tr>
            <th scope="col" colspan="2">訂單資料</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>訂購日期</td>
            <td>{{ order.create_at | convertDate }}</td>
          </tr>
          <tr>
            <td>訂單編號</td>
            <td>{{ order.id }}</td>
          </tr>
          <tr>
            <td>金額</td>
            <td>{{ order.total | currency }}</td>
          </tr>
        </tbody>
        <thead class="thead-light" style="border-top: 3px solid #7ab3b3">
          <tr>
            <th scope="col" colspan="2">訂購人資料</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>訂購人姓名</td>
            <td v-if="order.user">{{ order.user.name }}</td>
          </tr>
          <tr>
            <td>訂購人電話</td>
            <td v-if="order.user">{{ order.user.tel }}</td>
          </tr>
          <tr>
            <td>電子信箱</td>
            <td v-if="order.user">{{ order.user.email }}</td>
          </tr>
          <tr>
            <td>收件地址</td>
            <td v-if="order.user">{{ order.user.address }}</td>
          </tr>
          <tr>
            <td>備註</td>
            <td v-if="order.user">{{ order.message }}</td>
          </tr>
        </tbody>
      </table>

      <div class="text-center">
        <button
          class="btn btn-info btn-lg font-weight-bold"
          style="color: #fff"
        >
          結帳
        </button>
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
      order: {},
      orderId: '',
      isLoading: false,
      user: {}
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${this.orderId}`
      this.$http.get(url).then((res) => {
        // 如果沒有這筆訂單跳轉頁面回購物商場
        if (!res.data.order) {
          this.$router.push('/products')
        } else {
          this.order = res.data.order
          this.isLoading = false
        }
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
.step-1,
.step-3 {
  display: none;
}

.alert-gray {
  background-color: #f7f7f7;
  border-color: #f7f7f7;
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
  .table {
    width: 60%;
    margin: 20px auto 0;
  }
}
</style>
