<template>
        <b-card
                :key="product.id"
                :img-src="product.photo"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 15rem;"
                class="mb-2 item align-items-stretch"
        >
          <b-card-title>
            <router-link :to="'products/' + product.id">
              {{product.name}}
            </router-link>
          </b-card-title>
          <b-card-text>
            {{product.manufacturer}}
          </b-card-text>
          <b-card-text>
            {{product.short_text}}
          </b-card-text>
          <b-button v-if="!product.in_cart" variant="outline-success" @click="addToCart(product.id)">
            To cart
          </b-button>
          <b-button v-else variant="outline-success" to="/cart">
            Оформить
          </b-button>
        </b-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: ['product'],
  data () {
    return {

    }
  },
  computed: {
  },
  mounted () {
    console.log(this.product.in_cart)
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'GET_PRODUCTS_FROM_API'

    ]),
    addToCart (id) {
      this.ADD_TO_CART(id)
      this.GET_PRODUCTS_FROM_API()
    }
  }
}
</script>
<style>

</style>
