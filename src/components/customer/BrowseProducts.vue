<template>
  <div>
    <Nav></Nav>
    <div class="banner">
    </div>
    <div class="navbar container">
      <div class="title text-center">產品項目：{{ filter.category }}</div>
      <ul class="nav nav-pills">
        <li>
          <select class="custom-select" v-model="filter.category">
            <option value="全部">全部</option>
            <option value="單椅">單椅</option>
            <option value="L 型沙發">L 型沙發</option>
            <option value="一字型沙發">一字型沙發</option>
            <option value="餐桌">餐桌</option>
            <option value="茶几">茶几</option>
            <option value="電視櫃">電視櫃</option>
          </select>
        </li>
        <li>
          <select class="custom-select ml-2" v-model="filter.price">
            <option value="最新">最新</option>
            <option value="由高到低">價格</option>
            <option value="由低到高">價格</option>
          </select>
        </li>
      </ul>
    </div>

    <!-- 顯示產品 -->
    <div class="row mt-4">
      <div class="col-6 col-md-4 mb-3 col-lg-3" v-for="item in filterCategory" :key="item.id">
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
        filter: {
          category: decodeURIComponent(this.$route.query.category) || '全部',
          price: '最新'
        },
        cart: {},
        isLoading: false,
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
        pagination: {
          currentPage: 1,
          itemsPerPage: 10,
        },
      };
    },
    methods: {
      getProducts() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
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
      },
      pageCouter(categoryName) {
        const filterData = [...this.products]
        const totalProducts = filterData.filter(item => item.category === categoryName)
        const totalProductsCounts = filterData.filter(item => item.category === categoryName).length
        const itemsPerPage = this.pagination.itemsPerPage
        let totalPages = Math.ceil(totalProductsCounts / itemsPerPage)
        const offset = (this.pagination.currentPage - 1) * itemsPerPage
        return totalProducts.slice(offset, offset + itemsPerPage)
      },
    },
    computed: {
      filterCategory() {
        if (this.filter.category === '單椅') {
          return this.pageCouter('單椅')
        }
        if (this.filter.category === '茶几') {
          return this.pageCouter('茶几')
        }
        if (this.filter.category === '電視櫃') {
          return this.pageCouter('電視櫃')
        }
        if (this.filter.category === '餐桌') {
          return this.pageCouter('餐桌')
        }
        if (this.filter.category === 'L 型沙發') {
          return this.pageCouter('L 型沙發')
        }
        if (this.filter.category === '一字型沙發') {
          return this.pageCouter('一字型沙發')
        }
        if (this.filter.category === '全部') {
          const filterData = [...this.products]
          const totalProducts = filterData
          const totalProductsCounts = filterData.length
          const itemsPerPage = this.pagination.itemsPerPage
          let totalPages = Math.ceil(totalProductsCounts / itemsPerPage)
          const offset = (this.pagination.currentPage - 1) * itemsPerPage
          return totalProducts.slice(offset, offset + itemsPerPage)
        }
      }
    },
    created() {
      this.getProducts();
      this.getCart();
      
      // console.log(this.$route.query.category);
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
  /* 產品分類選單 */
    .custom-select {
      font-weight: bold;
      color: #7ab3b3;
    }
  /* 產品列表 */
  .original-price {
    color: #aaaaaa;
  }

  .price {
    color: #7ab3b3;
  }

  @media screen and (max-width: 375px) {
    .navbar.container {
      flex-direction: column;
    }
    .nav.nav-pills {
      margin-bottom: 10px;
      order: -1;
    }
  }
</style>