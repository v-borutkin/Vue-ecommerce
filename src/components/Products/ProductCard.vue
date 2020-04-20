<template>
  <div>
  <b-container>
    <b-card>
      <b-img :src="GET_PRODUCT.photo" width="480" />
      <h1>{{ GET_PRODUCT.name }}</h1>
      <h6>{{ GET_PRODUCT.description }}</h6>
      <p>{{ GET_PRODUCT.price }}</p>
      <b-button block variant="outline-success">
        To cart
      </b-button>
    </b-card>
  </b-container>
  <b-container >
    <b-col>
      <h2 class="mt-3">С этим товаром покупают</h2>
      <div class="d-flex flex-row mt-5 justify-content-around">
        <div v-for="product in GET_RECOMMENDED_PRODUCTS" :key="product.id">
          <product :product="product"/>
        </div>
      </div>
    </b-col>
  </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import product from './Product'

export default {
  name: 'Product',
  props: ['id'],
  components: {
    product
  },
  data () {
    return {

    }
  },

  methods: {
    ...mapActions([
      'GET_PRODUCT_FROM_API',
      'GET_RECOMMENDED_PRODUCTS_FROM_API'
    ]),
    reload () {
      this.GET_PRODUCT_FROM_API(this.id)
    }
  },

  computed: {
    ...mapGetters([
      'GET_PRODUCT',
      'GET_RECOMMENDED_PRODUCTS'
    ])
  },

  mounted () {
    this.GET_RECOMMENDED_PRODUCTS_FROM_API()
    this.GET_PRODUCT_FROM_API(this.id)
  }
}

</script>

<style scoped>

</style>
