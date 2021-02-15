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
          class="alert step-3 alert-info rounded-pill text-center"
        >
          3. 訂單完成
        </div>
      </div>

      <table class="table table-borderless">
        <thead>
          <tr>
            <th
              scope="col"
              colspan="2"
              style="text-align: center; font-size: 80px"
              class="text-success"
            >
              <i class="far fa-check-circle"></i>
            </th>
          </tr>
          <tr>
            <th
              scope="col"
              colspan="2"
              style="text-align: center; font-size: 24px"
              class="text-success"
            >
              付款成功，歡迎您再度光臨！
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: bold; font-size: 18px">訂購日期</td>
            <td>{{ order.create_at | convertDate }}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; font-size: 18px">訂單編號</td>
            <td>{{ order.id }}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; font-size: 18px">金額</td>
            <td>{{ order.total | currency }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-5">
        <routerLink
          class="btn btn-info"
          to="/products"
          style="color: #fff"
          >繼續購物<i class="ml-2 fas fa-angle-double-right"></i
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
.step-2 {
  display: none;
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
    width: 40%;
    margin: 0 auto 0;
  }
}
</style>
