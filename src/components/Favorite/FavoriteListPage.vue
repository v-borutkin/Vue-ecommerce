<template>
  <b-container>
    <h1 class="mt-5">Избранные товары</h1>
    <b-col>
      <div class="d-flex flex-wrap flex-xl-nowrap flex-md-row flex-column justify-content-sm-center"></div>
      <div class="justify-content-lg-around align-items-center col-12 mt-3">
        <div class="mt-2 ml-2" v-for="product in favoriteProducts" :key="product.good.id">
          <v-product :product="product.good"></v-product>
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
  computed: {
    ...mapState({
      favoriteProducts: (state) => state.favorite.favoriteProducts
    })
  },
  methods: {
    ...mapActions({
      getProductFavoriteList: 'favorite/getProductFavoriteList'
    }),
    ...mapActions('cart', [
      'ADD_TO_CART'
    ])
  },
  mounted () {
    this.getProductFavoriteListI()
  }
}
</script>
<style scoped>

</style>
