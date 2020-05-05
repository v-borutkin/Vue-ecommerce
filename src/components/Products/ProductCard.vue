<template>
  <div>
  <b-container>
    <b-card>
      <b-img :src="GET_PRODUCT.photo" width="480" />
      <h1>{{ GET_PRODUCT.name }}</h1>
      <h6>{{ GET_PRODUCT.description }}</h6>
      <p>{{ GET_PRODUCT.price }}</p>
      <div class="productButtons d-flex d-inline-flex justify-content-around">
        <div class="addToCart">
          <b-button v-if="!GET_PRODUCT.in_cart"
                    variant="outline-success"
                    @click="addToCart(id)"
          >
            <svg class="bi bi-bag" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z" clip-rule="evenodd"/>
              <path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>
            </svg>
            <span class="ml-2">Добавить в корзину</span>
          </b-button>
          <b-button v-else
                    variant="outline-success"
                    @click="deleteFromCart(id)">
            <svg class="bi bi-bag-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>
            </svg>
            <span class="ml-2">Удалить</span>
          </b-button>
        </div>
        <div class="addToFavorite">
          <b-button v-if="!GET_PRODUCT.in_favorite"
                    variant="outline-success"
                    @click="setFavorite(id)">
            <svg class="bi bi-star" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z" clip-rule="evenodd"/>
            </svg>
            <span class="ml-2">Добавить в избранное</span>
          </b-button>
          <b-button v-else
                    variant="outline-success"
                    @click="delFavorite(id)">
            <svg class="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <span class="ml-2">Убрать из избранного</span>
          </b-button>
        </div>
      </div>
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
  props: {
    id: {
      required: true
    }
  },
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
      'GET_RECOMMENDED_PRODUCTS_FROM_API',
      'SET_FAVORITE',
      'DEL_FAVORITE',
      'DELETE_FROM_CART',
      'ADD_TO_CART'
    ]),
    setFavorite (id) {
      if (!this.IS_AUTH) {
        alert('Необходимо авторизоваться')
      } else {
        this.SET_FAVORITE(parseInt(id)).then(response => {
          this.GET_PRODUCT_FROM_API(parseInt(id))
        })
      }
    },
    delFavorite (id) {
      if (!this.IS_AUTH) {
        alert('Необходимо авторизоваться')
      } else {
        this.DEL_FAVORITE(parseInt(id)).then(response => {
          this.GET_PRODUCT_FROM_API(parseInt(id))
        })
      }
    },
    addToCart (id) {
      if (!this.IS_AUTH) {
        alert('Необходимо авторизоваться')
      } else {
        this.ADD_TO_CART(parseInt(id)).then(response => {
          this.GET_PRODUCT_FROM_API(parseInt(id))
        })
      }
    },
    deleteFromCart (id) {
      if (!this.IS_AUTH) {
        alert('Необходимо авторизоваться')
      } else {
        this.DELETE_FROM_CART(parseInt(id)).then(response => {
          this.GET_PRODUCT_FROM_API(parseInt(id))
        })
      }
    }
  },

  computed: {
    ...mapGetters([
      'GET_PRODUCT',
      'GET_RECOMMENDED_PRODUCTS',
      'IS_AUTH'
    ])
  },

  mounted () {
    this.GET_RECOMMENDED_PRODUCTS_FROM_API()
    this.GET_PRODUCT_FROM_API(this.id)
  }
}

</script>

<style scoped>
  .productButtons{
    width: 100%;
  }
</style>
