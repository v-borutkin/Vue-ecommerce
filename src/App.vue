<template>
  <div id="app">
    <div class="wrapper">
      <navigation :cartLength="cartList.length"></navigation>
      <div class="content">
        <keep-alive include="Products, Home, Cart">
          <router-view/>
        </keep-alive>
      </div>
        <footer-component />
    </div>
  </div>

</template>
<script>
import Navigation from './components/Home/Navigation'
import Footer from './components/Home/Footer'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Navigation,
    'footer-component': Footer // TODO прижать футер книзу
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
    ...mapActions('cart', [
      'GET_CART_LIST_FROM_API'
    ]),
    ...mapActions('user', [
      'TO_AUTH'
    ])
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.TO_AUTH()
      this.GET_CART_LIST_FROM_API()
    }
  }
}
</script>
<style scoped>
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
