<template lang="pug">
  b-container
    b-col
      .d-flex.flex-xl-wrap.flex-md-row.flex-column.justify-content-sm-center.justify-content-lg-between.align-items-center.col-12
        transition(name="fade" mode="out-in")
        .mt-2.ml-2(v-for="product in products" :key="product.id")
          v-product(:product="product", :category=0, :page="currentPage")
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
    ])
  },
  methods: {
    ...mapActions('products', [
      'FETCH_PRODUCTS_FROM_API'
    ])
  },
  watch: {
    currentPage () {
      this.FETCH_PRODUCTS_FROM_API({
        category: 1,
        page: this.currentPage
      })
    }
  }
}
</script>
<style scoped>

</style>
