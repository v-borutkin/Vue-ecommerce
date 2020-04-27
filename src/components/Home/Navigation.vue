<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>
        <router-link to="/" exact> Vuecommerce </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-for="(link, index) in getLinks " :key="index">
          <router-link :to="link.url" class="ml-2">{{link.title}}</router-link>
<!--          <b-nav-item  :href="link.url"><router-link to="/">{{link.title}}</router-link></b-nav-item>-->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <router-link class="ml-2 mt-2" to="/cart">
              <button class="btn btn-primary"> {{cartLength}} Корзина</button>
            </router-link>
          <b-nav-item-dropdown right v-if="IS_AUTH">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
                <em>{{GET_USER.userName}}</em>
            </template>
            <b-dropdown-item href="#">Профиль</b-dropdown-item>
            <b-dropdown-item href="#" @click="userLogout">Выйти</b-dropdown-item>
          </b-nav-item-dropdown>
          <div v-else class="flex flex-row">
            <router-link to="/auth" class="ml-2">Войти</router-link>
            <router-link to="/registration" class="ml-2">Регистрация</router-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Navigation',
  props: ['cartLength'],
  computed: {
    getLinks () {
      return this.$store.getters.getNavLinks // TODO пофиксить
    },
    ...mapGetters([
      'IS_AUTH',
      'GET_USER'
    ])
  },
  methods: {
    ...mapActions([
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
