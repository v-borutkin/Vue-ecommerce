<template lang="pug">
  b-container
    h1.mt-5 Избранные товары
    b-col
      .d-flex.flex-wrap.flex-xl-nowrap.flex-md-row.flex-column.justify-content-sm-center
      .justify-content-lg-around.align-items-center.col-12.mt-3
        .mt-2.ml-2(v-for='product in favoriteProducts', :key='product.good.id')
          v-product(:product='product.good')

</template>
<script>
import { mapActions, mapState } from 'vuex'
import vProduct from '../Products/vProduct'
export default {
  components: {
    vProduct
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('favorite', [
      'favoriteProducts'
    ])
  },
  methods: {
    ...mapActions('favorite', [
      'FETCH_FAVORITE_PRODUCTS_FROM_API'
    ]),
    ...mapActions('cart', [
      'ADD_TO_CART'
    ])
  },
  mounted () {
    this.FETCH_FAVORITE_PRODUCTS_FROM_API()
  }
}
</script>
<style scoped>

</style>
