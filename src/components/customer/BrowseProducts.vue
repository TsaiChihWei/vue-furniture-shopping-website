<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Nav :cartCount="cartNum"></Nav>
    <AlertMessage></AlertMessage>
    <div class="banner"></div>
    <div class="navbar container">
      <div class="title text-center">產品項目：{{ filter.category }}</div>
      <ul class="nav nav-pills">
        <li>
          <select class="custom-select" v-model="filter.category">
            <option value="全部">全部</option>
            <option value="單椅">單椅</option>
            <option value="沙發">沙發</option>
            <option value="燈具">燈具</option>
            <option value="書桌">書桌</option>
            <option value="茶几">茶几</option>
            <option value="門">門</option>
          </select>
        </li>
        <li>
          <select class="custom-select ml-2" v-model="filter.price">
            <option value="最新">最新</option>
            <option value="由高到低">價格：由高到低</option>
            <option value="由低到高">價格：由低到高</option>
          </select>
        </li>
      </ul>
    </div>

    <!-- 顯示產品 -->
    <div class="row">
      <div
        class="col-6 col-md-4 mb-3 col-lg-2"
        v-for="item in filterCategory"
        :key="item.id"
      >
        <div
          class="card text-center border-0 shadow-sm"
          @click="goToProduct(item.id)"
        >
          <div
            style="
              height: 150px;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <h5 class="card-title">
              {{ item.title }}
            </h5>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6 original-price" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5 price" v-if="item.price">{{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer">
            <a
              type="button"
              class="btn btn-outline-primary btn-sm ml-auto"
              @click.stop="addtoCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              加到購物車
            </a>
          </div>
        </div>
      </div>
    </div>

    <Pagination :pagination="pagination" @emitPages="updatePage"></Pagination>
    <Warning></Warning>
  </div>
</template>

<script>
import Nav from '../Nav'
import Pagination from '../Pagination'
import AlertMessage from '../AlertMessage'
import Warning from '../Warning'
import $ from 'jquery'
export default {
  components: {
    Nav,
    Pagination,
    AlertMessage,
    Warning
  },
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      filter: {
        category: '全部',
        price: '最新'
      },
      cartNum: {},
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: ''
      }
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.products = response.data.products
        vm.products = vm.products.filter(ele => ele.is_enabled === 1)
        vm.isLoading = false
      })
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((response) => {
        console.log(response)
        vm.status.loadingItem = ''
        this.$bus.$emit('message:push', '商品已加入購物車！', 'info')
        vm.getCart()
      })
    },
    getCart () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.cartNum = response.data.data.carts.length
        vm.isLoading = false
      })
    },

    pageCouter (categoryName) {
      // API 抓回來的資料是從最舊道最新，預設要顯示最新，所以這邊把它反轉
      const filterData = [...this.products].reverse()

      // 價錢篩選
      if (this.filter.price === '由高到低') {
        filterData.sort((a, b) => b.price - a.price)
      }
      if (this.filter.price === '由低到高') {
        filterData.sort((a, b) => a.price - b.price)
      }

      let totalProducts = filterData.filter(
        (item) => item.category === categoryName
      )
      let totalProductsCounts = filterData.filter(
        (item) => item.category === categoryName
      ).length
      if (categoryName === '全部') {
        totalProducts = filterData
        totalProductsCounts = filterData.length
      }
      const itemsPerPage = this.pagination.itemsPerPage
      this.pagination.totalPages = Math.ceil(
        totalProductsCounts / itemsPerPage
      )
      const offset = (this.pagination.currentPage - 1) * itemsPerPage
      return totalProducts.slice(offset, offset + itemsPerPage)
    },
    updatePage (emittedPage) {
      this.pagination.currentPage = emittedPage
      // 滾動到最上面
      $('html,body').animate({ scrollTop: 0 }, 'slow')
    },
    goToProduct (id) {
      this.$router.push(`/products/${id}`)
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filterCategory () {
      if (this.filter.category === '單椅') {
        return this.pageCouter('單椅')
      }
      if (this.filter.category === '茶几') {
        return this.pageCouter('茶几')
      }
      if (this.filter.category === '門') {
        return this.pageCouter('門')
      }
      if (this.filter.category === '書桌') {
        return this.pageCouter('書桌')
      }
      if (this.filter.category === '沙發') {
        return this.pageCouter('沙發')
      }
      if (this.filter.category === '燈具') {
        return this.pageCouter('燈具')
      }
      if (this.filter.category === '全部') {
        return this.pageCouter('全部')
      }
    }
  },
  created () {
    this.getProducts()
    this.getCart()

    // 如果是從首頁的熱門商品分類連進來的話
    if (this.$route.query.category) {
      this.filter.category = this.$route.query.category
    }
  }
}
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

.row {
  margin: 30px 0 0 0;
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

.card {
  outline: 1px solid rgba(0, 0, 0, 0.125);
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.6s, all;
  }
}

/* 產品分類及價錢分類小螢幕調整 */
@media screen and (max-width: 450px) {
  .navbar.container {
    flex-direction: column;
  }

  .nav.nav-pills {
    margin-bottom: 10px;
    order: -1;
  }
}
</style>
