<template>
  <div id="app">
    <slider></slider>
    <b-container >
        <b-col>
          <div class="d-flex">
            <div v-for="product in GET_PRODUCTS.slice(0,5)" :key="product.id">
              <product :product="product"/>
            </div>
          </div>
          <b-button block variant="primary" class="mt-4">Все продукты</b-button>
        </b-col>
    </b-container>
  </div>
</template>
<script>
import Slider from './Slider'
import product from '../Products/Product'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Slider, product
  },
  data () {
    return {
      isAuth: false
    }
  },
  computed: {
    ...mapGetters([
      'GET_PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API'
    ])
  },
  mounted () {
    this.GET_PRODUCTS_FROM_API(0)
  }
}
</script>
<style scoped>
  .item {
    margin: 10px 10px;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
