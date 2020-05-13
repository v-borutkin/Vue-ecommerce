<template>
    <b-container >
      <b-col>
        <div class="d-flex flex-row flex-wrap">
          <div v-for="product in products" :key="product.id">
            <product :product="product"/>
          </div>
        </div>
      </b-col>
    </b-container>
  </template>
<script>
import { mapActions, mapState } from 'vuex'
import product from './Product'

export default {
  components: {
    product
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
