<template>
  <b-container>
    <h1 class="mt-5">Избранные товары</h1>
    <b-col>
      <div class="d-flex
          flex-wrap
          flex-xl-nowrap
          flex-md-row
          flex-column
          justify-content-sm-center
          justify-content-lg-around
          align-items-center
          col-12
          mt-3">
        <div v-for="product in favoriteProducts" class="mt-2 ml-2" :key="product.good.id">
          <v-product :product="product.good"/>
        </div>
      </div>
    </b-col>
  </b-container>
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
