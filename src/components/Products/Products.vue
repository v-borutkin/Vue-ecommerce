<template>
    <b-container >
      <b-col>
        <div class="d-flex flex-row flex-wrap">
          <div v-for="product in GET_PRODUCTS" :key="product.id">
            <product :product="product"/>
          </div>
        </div>
      </b-col>
    </b-container>
  </template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters([
      'GET_PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ])
  },
  mounted () {
    this.GET_PRODUCTS_FROM_API(0)
  }
}
</script>
<style>

</style>
