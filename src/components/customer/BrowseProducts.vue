<template>
  <div>
    <Nav></Nav>
    <div class="banner">
    </div>
    <div class="navbar">
      <div class="title text-center">產品項目：單椅</div>
      <ul class="nav nav-pills">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">產品分類</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">價格</a>
        </li>
      </ul>
    </div>

    <!-- 顯示產品 -->
    <div class="row mt-4">
      <div class="col-6 col-md-4 mb-3" v-for="item in products" :key="item.id">
        <div class="card text-center border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <h5 class="card-title">
              {{ item.title }}
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6 original-price" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5 price" v-if="item.price"> {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer">
            <a type="button" class="btn btn-outline-primary btn-sm ml-auto" @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
  import Nav from '../Nav'
  import $ from 'jquery';
  export default {
    components: {
      Nav,
    },
    data() {
      return {
        products: [],
        product: {},
        status: {
          loadingItem: '',
        },
        cart: {},
        isLoading: false,
        coupon_code: '',
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
      };
    },
    methods: {
      getProducts() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
        vm.isLoading = true;
        this.$http.get(url).then((response) => {
          vm.products = response.data.products;
          console.log(response);
          vm.isLoading = false;
        });
      },
      getProduct(id) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        vm.status.loadingItem = id;
        this.$http.get(url).then((response) => {
          vm.product = response.data.product;
          $('#productModal').modal('show');
          console.log(response);
          vm.status.loadingItem = '';
        });
      },
      addtoCart(id, qty = 1) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty,
        };
        this.$http.post(url, { data: cart }).then((response) => {
          console.log(response);
          vm.status.loadingItem = '';
          vm.getCart();
          $('#productModal').modal('hide');
        });
      },
      getCart() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.isLoading = true;
        this.$http.get(url).then((response) => {
          // vm.products = response.data.products;
          vm.cart = response.data.data;
          console.log(response);
          vm.isLoading = false;
        });
      },
      removeCartItem(id) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        vm.isLoading = true;
        this.$http.delete(url).then((response) => {
          vm.getCart()
          console.log(response);
          vm.isLoading = false;
        });
      },
      addCouponCode() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const coupon = {
          coode: vm.coupon_code
        }
        vm.isLoading = true;
        this.$http.post(url, { data: coupon }).then((response) => {
          vm.getCart()
          console.log(response);
          vm.isLoading = false;
        });
      },
      createOrder() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const order = vm.form
        vm.isLoading = true;
        this.$http.post(url, { data: order }).then((response) => {
          console.log('訂單已建立', response);
          if (response.data.success) {
            vm.$router.push(`/customer_checkout/${response.data.orderId}`)
          }
          vm.isLoading = false;
        });
      }
    },
    created() {
      this.getProducts();
      this.getCart();
    },
  };
</script>

<style lang="scss" scoped>
  .banner {
    height: 150px;
    background-image: url(../../assets/images/banner2.jpg);
    background-size: cover;
    background-position: center bottom;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
  }

  .title {
    color: #7ab3b3;
    font-size: 18px;
    font-weight: bold;
  }

  .nav {
    justify-content: flex-end;
  }

  .nav-link {
    font-weight: bold;
  }

  /* 產品列表 */
  .original-price {
    color: #aaaaaa;
  }
  .price {
    color: #7ab3b3;
  }
</style>