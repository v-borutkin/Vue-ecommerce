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
          <b-button variant="outline-success" @click="addCart(product.id)">
            To cart
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
  methods: {
    ...mapActions([
      'ADD_TO_CART'
    ]),
    addCart (id) {
      this.ADD_TO_CART(id)
      this.$emit('click', id)
    }
  }
}
</script>
<style>

</style>
