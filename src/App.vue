<template lang="pug">
  #app
    .wrapper
      the-navigation(:cartLength="cartList.length")
      .content
        keep-alive
          transition(name="fade" mode="out-in")
            router-view
</template>
<script>
import TheNavigation from './components/Assets/TheNavigation'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    TheNavigation
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cart.cartList
    })
  },
  methods: {
    ...mapActions({
      toAuth: 'user/toAuth',
      getProducts: 'products/getProducts',
      GET_CART_LIST_FROM_API: 'cart/GET_CART_LIST_FROM_API'
    })
  },
  mounted () {
    this.getProducts({
      category: 0,
      page: 1
    })
    if (localStorage.getItem('token')) {
      this.toAuth()
      this.GET_CART_LIST_FROM_API()
    }
  }
}
</script>
<style>
  .error-api {
    color: #dc3545;
    font-size: 80%;
    margin-top: .25rem;
    transition: all;
    transition-timing-function: ease
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease-out;
  }
  .fade-enter,  .fade-leave-to {
    opacity: 0;
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
body {
  height: 100%;
}
.wrapper {
  height: 100%;
}
.content {
  box-sizing: border-box;
  min-height: 100%;
  padding-bottom: 230px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
