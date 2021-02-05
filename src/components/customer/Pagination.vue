<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': pagination.currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="updatePage(pagination.currentPage - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li :class="{ 'active': pagination.currentPage === page }" class="page-item" v-for="page in pagination.totalPages" :key="page">
          <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': pagination.currentPage === pagination.totalPages }">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="updatePage(pagination.currentPage + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  name: 'Pagination',
  props: ['pagination'],
  methods: {
    updatePage (page) {
      this.$emit('emitPages', page)
    }
  }
}
</script>
