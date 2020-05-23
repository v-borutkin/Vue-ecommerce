<template lang="pug">
.app
  v-slider
  b-container
    b-col
      .d-flex.flex-wrap.flex-md-row.flex-column.justify-content-md-between.align-content-center
        div(v-for='product in products.slice(0,3)' :key='product.id')
          v-product(:product="product")
        b-button(block variant="primary" class="mt-4" to="/products/") Все продукты
</template>
<script>
import vSlider from '../Assets/vSlider'
import vProduct from '../Products/vProduct'
import { mapState } from 'vuex'

export default {
  components: {
    vSlider, vProduct
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

  },
  mounted () {

  }
}
</script>
<style scoped>
  .item {
    margin: 10px 10px;
  }
  .app {
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
