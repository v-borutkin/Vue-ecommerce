<template lang="pug">
  b-container
    .d-flex.flex-column.flex-md-row.justify-content-sm-center.align-items-center.align-items-md-start
      div.categories
        ul.categories-list
          li(v-for="category in categories" @click="setCategory(category.id)") {{category.name}}
      b-col
        .d-flex.flex-md-wrap.flex-md-row.flex-column.justify-content-sm-center.justify-content-lg-between.align-items-center.col-12
          .mt-2.ml-2(v-for="product in products" :key="product.id")
            v-product(:product="product", :category=this.category, :page="currentPage" :key="product.id")
    div
      v-pagination(v-if='paginationCount > 1', v-model='currentPage', :page-count='paginationCount', :classes='bootstrapPaginationClasses')
  </template>
<script>
import { mapActions, mapState } from 'vuex'
import vProduct from './vProduct'
import vPagination from 'vue-plain-pagination'

export default {
  components: {
    vProduct, vPagination
  },
  data () {
    return {
      category: 0,
      currentPage: 1,
      bootstrapPaginationClasses: {
        ul: 'pagination',
        li: 'page-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link'
      }
    }
  },
  computed: {
    ...mapState('products', [
      'products',
      'paginationCount'
    ]),
    ...mapState('categories', ['categories'])
  },
  methods: {
    setCategory (id) {
      this.category = id
    },
    ...mapActions('products', ['FETCH_PRODUCTS_FROM_API']),
    ...mapActions('categories', ['FETCH_CATEGORIES_FROM_API'])
  },
  watch: {
    category () {
      this.FETCH_PRODUCTS_FROM_API({
        category: this.category,
        page: this.currentPage
      })
    },
    currentPage () {
      this.FETCH_PRODUCTS_FROM_API({
        category: this.category,
        page: this.currentPage
      })
    }
  },
  mounted () {
    this.FETCH_CATEGORIES_FROM_API()
  }
}
</script>
<style scoped>
  .categories-list {
    margin-top: 10px;
    padding-left: 0;
  }
  .categories-list li{
    padding: 10px;
    list-style: none;
    border: 1px solid gray;
  }
  .categories-list li:hover{
    color: white;
    background-color: #007bff;
    cursor: pointer;
  }
  .categories {
    width: 200px;
  }
  .pagination {
    margin-top: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
