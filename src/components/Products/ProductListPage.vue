<template>
    <b-container >
      <b-col>
        <div class="d-flex
          flex-wrap
          flex-xl-wrap
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
    ...mapActions('cart', [
      'ADD_TO_CART'
    ])
  }
}
</script>
<style scoped>

</style>
