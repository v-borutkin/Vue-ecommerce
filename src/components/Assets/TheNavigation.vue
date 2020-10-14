<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>
        <router-link to="/" exact="exact"> Vuecommerce</router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav="is-nav">
        <b-navbar-nav v-for="(link, index) in navLinks " :key="index">
          <router-link class="ml-2" :to="link.url">{{link.title}}</router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="ml-2 mt-1" to="/cart"><button class="btn btn-primary"> {{cartLength}} Корзина</button></router-link>
          <b-nav-item-dropdown right="right" v-if="isAuth">
            <template #button-content>
              <b-avatar variant="info" src="https://placekitten.com/300/300/" />
              <em>{{user.userName}}</em>
            </template>
            <b-dropdown-item to="/profile">Профиль</b-dropdown-item>
            <b-dropdown-item to="/favorites">Избранное</b-dropdown-item>
            <b-dropdown-item to="/orders">Заказы</b-dropdown-item>
            <b-dropdown-item @click="userLogout">Выйти</b-dropdown-item>
          </b-nav-item-dropdown>
          <div class="flex flex-row mt-2" v-else>
            <router-link class="ml-2" to="/auth">Войти</router-link>
            <router-link class="ml-2" to="/registration">Регистрация</router-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Navigation',
  props: ['cartLength'],
  computed: {
    ...mapState({
      navLinks: (state) => state.navigation.navLinks,
      isAuth: (state) => state.user.isAuth,
      user: (state) => state.user.user
    })
  },
  mounted () {
    console.log(this.user)
  },
  methods: {
    ...mapActions('user', [
      'LOGOUT'
    ]),
    userLogout () {
      this.LOGOUT()
    }
  }
}
</script>

<style scoped>
 a{
   color: rgba(255,255,255,.5)
 }
  a.router-link-active {
    color: #f66;
  }
  li.router-link-active a {
    color: #f66;
  }
</style>
