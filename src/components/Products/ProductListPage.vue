<template>
    <b-container >
      <b-col>
        <div class="d-flex
          flex-wrap
          flex-xl-nowrap
          flex-md-row
          flex-column
          justify-content-sm-center
          justify-content-lg-between
          align-items-center
          col-12">
          <div v-for="product in products" class="mt-2 ml-2" :key="product.id">
            <v-product :product="product"/>
          </div>
        </div>
      </b-col>
    </b-container>
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
    ...mapActions('products', [
      'FETCH_PRODUCTS_FROM_API'
    ]),
    ...mapActions('cart', [
      'ADD_TO_CART'
    ])
  },
  mounted () {
    this.FETCH_PRODUCTS_FROM_API()
  }
}
</script>
<style scoped>

</style>
