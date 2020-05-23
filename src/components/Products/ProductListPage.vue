<template lang="pug">
  b-container
    b-col
      .d-flex.flex-xl-wrap.flex-md-row.flex-column.justify-content-sm-center.justify-content-lg-between.align-items-center.col-12
        .mt-2.ml-2(v-for="product in products" :key="product.id")
          v-product(:product="product")
  </template>
<script>
import { mapActions, mapState } from 'vuex'
import vProduct from './vProduct'

export default {
  components: {
    vProduct
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('products', [
      'products'
    ])
  },
  methods: {
    ...mapActions('cart', [
      'ADD_TO_CART'
    ])
  }
}
</script>
<style scoped>

</style>
