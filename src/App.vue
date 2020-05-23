<template>
  <div id="app">
    <div class="wrapper">
      <the-navigation :cartLength="cartList.length"></the-navigation>
      <div class="content">
          <keep-alive include="Blog">
            <transition name="fade" mode="out-in">
              <router-view/>
            </transition>
          </keep-alive>
      </div>
    </div>
  </div>

</template>
<script>
import TheNavigation from './components/Assets/TheNavigation'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    TheNavigation
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('cart', [
      'cartList'
    ])
  },
  methods: {
    ...mapActions('products', [
      'FETCH_PRODUCTS_FROM_API'
    ]),
    ...mapActions('cart', [
      'GET_CART_LIST_FROM_API'
    ]),
    ...mapActions('user', [
      'TO_AUTH'
    ])
  },
  mounted () {
    this.FETCH_PRODUCTS_FROM_API(0)
    if (localStorage.getItem('token')) {
      this.TO_AUTH()
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
  .loading-indicator:before {
    content: '';
    background: #000000cc;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .loading-indicator:after {
    content: 'Loading';
    position: fixed;
    width: 100%;
    top: 50%;
    left: 0;
    z-index: 1001;
    color:white;
    text-align:center;
    font-weight:bold;
    font-size:1.5rem;
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
