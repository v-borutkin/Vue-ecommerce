<template>
  <b-card class="item img" :key="product.id" :img-src="imgUrl(product.photo)" img-alt="Image" tag="article">
    <b-card-title>
      <router-link :to="'/products/'+ product.id">{{product.name}}</router-link>
    </b-card-title>
    <b-card-text>{{product.short_text}}</b-card-text>
    <div class="productButtons d-flex d-inline-flex justify-content-around">
      <div class="addToCart">
        <ui-button
          v-if="!product.in_cart"
          title="Add to cart"
          @click="addToCart(product.id)"
          :key="0">
          <svg class="bi bi-bag" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z"
                  clip-rule="evenodd"></path>
            <path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>
          </svg>
        </ui-button>
        <ui-button
          v-else
          title="Delete from cart"
          @click="deleteFromCart(product.id)"
          :key="0">
          <svg class="bi bi-bag-fill" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>
          </svg>
        </ui-button>
      </div>
      <div class="addToFavorite">
        <ui-button
          v-if="!product.in_favorite"
          title="Add to favorite"
          @click="addFavorite(product.id)"
          :key="0">
          <svg class="bi bi-star" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </ui-button>
        <ui-button v-else title="Delete from favorite" @click="delFavorite(product.id)" :key="1">
          <svg class="bi bi-star-fill" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
          </svg>
        </ui-button>
      </div>
    </div>
  </b-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import imgUrl from '../../mixins/imgUrl'
import UiButton from '@/components/Shared/UiButton'
export default {
  components: { UiButton },
  props: ['product', 'category', 'page'],
  mixins: [imgUrl],
  computed: {
    ...mapState('user', [
      'isAuth'
    ])
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      deleteFromCart: 'cart/deleteFromCart',
      setFavorite: 'favorite/setFavorite',
      deleteFavorite: 'favorite/deleteFavorite'
    }),
    addFavorite (id) {
      if (this.isAuth) {
        try {
          this.setFavorite(id)
        } catch (e) {
          this.$toasted.error('Произошла ошибка')
        }
      } else {
        this.$toasted.error('Need authorization')
      }
    },
    delFavorite (id) {
      if (this.isAuth) {
        try {
          this.deleteFavorite(id)
        } catch (e) {
          console.log(e)
          this.$toasted.error('Произошла ошибка')
        }
      } else {
        this.$toasted.error('Need authorization')
      }
    },
    addToCart (id) {
      if (!this.isAuth) {
        this.$toasted.error('Need authorization')
      } else {
        this.ADD_TO_CART({
          productId: id,
          category: this.category,
          page: this.page
        })
      }
    },
    deleteFromCart (id) {
      if (!this.isAuth) {
        this.$toasted.error('Need authorization')
      } else {
        this.DELETE_FROM_CART({
          productId: id,
          category: this.category,
          page: this.page
        })
      }
    }
  }
}
</script>

<style scoped>
  .productButtons {
    position: absolute;
    bottom: 20px;
    right: 0;
  }
  .item img {
    display: block;
    padding-top: 10px;
    height: 40%;
    margin: 0 auto;
    object-fit: contain;
  }
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-height: 30px;
    max-height: 90px;
  }
  .item {
    width: 255px;
    height: 450px;
  }
  .productButtons{
    width: 100%;
  }
</style>
