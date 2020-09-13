<template>
  <div>
    <b-container>
      <b-card>
        <b-img :src="imgUrl(product.photo)"></b-img>
        <h1>{{ product.name }}</h1>
        <h6>{{ product.description }}</h6>
        <p>{{ product.price }}</p>
        <div :class="[$style.productButtons]">
          <div :class="$style.addToCart">
            <transition name="fade" mode="out-in">
              <b-button v-if="!product.in_cart" variant="outline-success" @click="addToCart(id)" key="0">
                <svg class="bi bi-bag" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z"
                        clip-rule="evenodd"></path>
                  <path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"></path>
                </svg>
                <span
                  :class="$style.ml-2">Добавить в корзину</span>
              </b-button>
              <b-button v-else variant="outline-success" @click="deleteFromCart()" key="1">
                <svg class="bi bi-bag-fill" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"></path>
                </svg>
                <span
                  :class="$style.ml-2">Удалить</span>
              </b-button>
            </transition>
          </div>
          <div :class="$style.addToFavorite">
            <transition name="fade" mode="out-in">
              <b-button v-if="!product.in_favorite" variant="outline-success" @click="addFavorite(id)" key="0">
                <svg class="bi bi-star" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z"
                        clip-rule="evenodd"></path>
                </svg>
                <span
                  :class="$style.ml-2">Добавить в избранное</span>
              </b-button>
              <b-button v-else variant="outline-success" @click="delFavorite(id)" key="1">
                <svg class="bi bi-star-fill" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span
                  :class="$style.ml-2">Убрать из избранного</span>
              </b-button>
            </transition>
          </div>
        </div>
      </b-card>
    </b-container>
    <b-container>
      <b-col>
        <h2 :class="$style.mt-3">С этим товаром покупают</h2>
        <div :class="[$style.recommendedProducts]">
          <div v-for="product in recommendedProducts" :key="product.id">
            <v-product :product="product"></v-product>
          </div>
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vProduct from './vProduct'
import imgUrl from '@/mixins/imgUrl'

export default {
  name: 'Product',
  mixins: [imgUrl],
  props: {
    id: {
      type: String,
      default: null,
      required: true
    }
  },
  components: {
    vProduct
  },
  watch: {
    '$route.params.id' () {
      this.getProduct(this.id)
    }
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.user.isAuth,
      product: (state) => state.products.product,
      recommendedProducts: (state) => state.products.recommendedProducts
    })
  },
  methods: {
    ...mapActions({
      getRandomProduct: 'products/getRandomProduct',
      getProduct: 'products/getProduct',
      addToCart: 'cart/addToCart',
      deleteFromCart: 'cart/deleteFromCart',
      setFavorite: 'favorite/setFavorite',
      deleteFavorite: 'favorite/deleteFavorite'
    }),
    addFavorite () {
      if (this.isAuth) {
        this.setFavorite(this.id)
      } else {
        this.$toasted.error('Need authorization')
      }
    },
    delFavorite () {
      if (this.isAuth) {
        this.deleteFavorite(this.id)
      } else {
        this.$toasted.error('Need authorization')
      }
    },
    addToCart () {
      if (this.isAuth) {
        this.ADD_TO_CART({ productId: this.id })
      } else {
        this.$toasted.error('Need authorization')
      }
    },
    deleteFromCart () {
      if (this.isAuth) {
        this.deleteFromCart({ productId: this.id })
      } else {
        this.$toasted.error('Need authorization')
      }
    }
  },
  mounted () {
    this.getRandomProduct()
    this.getProduct(this.id)
  }
}

</script>

<style module>
  .productButtons {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  img {
    display: block;
    padding-top: 10px;
    width: 20%;
    margin: 0 auto;
    object-fit: contain;
  }

  .recommendedProducts {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
  }
</style>
