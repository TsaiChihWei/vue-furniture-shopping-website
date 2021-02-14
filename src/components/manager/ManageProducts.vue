<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-2">
            <button class="btn btn-primary" @click="openModal(true)">建立新產品</button>
        </div>
        <div class="d-flex mt-2">
          <select class="custom-select" v-model="filter.category">
                <option value="全部">全部</option>
                <option value="單椅">單椅</option>
                <option value="沙發">沙發</option>
                <option value="書桌">書桌</option>
                <option value="茶几">茶几</option>
                <option value="燈具">燈具</option>
                <option value="門">門</option>
          </select>
          <select class="custom-select" v-model="filter.date">
              <option value="最新">最新</option>
              <option value="最舊">最舊</option>
          </select>
        </div>
        <table class="table mt-2">
            <thead>
                <th width="120px">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
            </thead>
            <tbody>
                <tr v-for="item in filterCategory" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.origin_price | currency}}</td>
                    <td>{{ item.price | currency}}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td class="d-flex">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm ml-1" @click="openDeleteModal(item)">刪除</button>
                    </td>
                </tr>

            </tbody>
        </table>

        <Pagination :pagination="pagination" @emitPages="updatePage"></Pagination>
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input v-model="tempProduct.imageUrl" type="text" class="form-control" id="image"
                                        placeholder="請輸入圖片連結">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                    </label>
                                    <input type="file" id="customFile" class="form-control" ref="files"
                                        @change="uploadFile">
                                </div>
                                <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input v-model="tempProduct.title" type="text" class="form-control" id="title"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input v-model="tempProduct.category" type="text" class="form-control"
                                            id="category" placeholder="請輸入分類">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input v-model="tempProduct.unit" type="unit" class="form-control" id="unit"
                                            placeholder="請輸入單位">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input v-model="tempProduct.origin_price" type="number" class="form-control"
                                            id="origin_price" placeholder="請輸入原價">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input v-model="tempProduct.price" type="number" class="form-control" id="price"
                                            placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea v-model="tempProduct.description" type="text" class="form-control"
                                        id="description" placeholder="請輸入產品描述"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea v-model="tempProduct.content" type="text" class="form-control"
                                        id="content" placeholder="請輸入產品說明內容"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="is_enabled"
                                            v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '../Pagination'
export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: ''
      },
      filter: {
        category: '全部',
        date: '最新'
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products/all`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        vm.products = response.data.products
        vm.isLoading = false
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        // this.tempProduct = {...item}
        // this.tempProduct = item
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    updateProduct () {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          console.log('新增失敗！')
        }
      })
    },
    openDeleteModal (item) {
      this.tempProduct = { ...item }
      $('#delProductModal').modal('show')
    },
    deleteProduct () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api).then(response => {
        console.log(response.data)
      })
      $('#delProductModal').modal('hide')
      this.getProducts()
    },
    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]
      const formData = new FormData()
      const vm = this
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      vm.status.fileUploading = true
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data)
        vm.status.fileUploading = false
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    pageCouter (categoryName) {
      // API 抓回來的資料是從最舊道最新，預設要顯示最新，所以這邊把它反轉
      const filterData = Object.values(this.products).reverse()
      // 最舊篩選
      if (this.filter.date === '最舊') {
        filterData.reverse()
      }
      let totalProducts = filterData.filter(item => item.category === categoryName)
      let totalProductsCounts = filterData.filter(item => item.category === categoryName).length
      if (categoryName === '全部') {
        totalProducts = filterData
        totalProductsCounts = filterData.length
      }
      const itemsPerPage = this.pagination.itemsPerPage
      this.pagination.totalPages = Math.ceil(totalProductsCounts / itemsPerPage)
      const offset = (this.pagination.currentPage - 1) * itemsPerPage
      return totalProducts.slice(offset, offset + itemsPerPage)
    },
    updatePage (emittedPage) {
      this.pagination.currentPage = emittedPage
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
  }
}
</script>

<style lang="scss">
.custom-select {
  width: auto;
}
</style>
