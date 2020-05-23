<template lang="pug">
  div
    b-navbar(toggleable='lg', type='dark', variant='info')
      b-navbar-brand
        router-link(to='/', exact)  Vuecommerce
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav(v-for='(link, index) in navLinks ', :key='index')
          router-link.ml-2(:to='link.url') {{link.title}}
        b-navbar-nav.ml-auto
          router-link.ml-2.mt-1(to='/cart')
            button.btn.btn-primary  {{cartLength}} Корзина
          b-nav-item-dropdown(right, v-if='isAuth')
            template(v-slot:button-content)
              b-avatar(variant='info', src='https://placekitten.com/300/300/')
              em {{user.userName}}
            b-dropdown-item(to='/profile') Профиль
            b-dropdown-item(to='/favorites') Избранное
            b-dropdown-item(to='/orders') Заказы
            b-dropdown-item(@click='userLogout') Выйти
          .flex.flex-row.mt-2(v-else)
            router-link.ml-2(to='/auth') Войти
            router-link.ml-2(to='/registration') Регистрация
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Navigation',
  props: ['cartLength'],
  computed: {
    ...mapState('navigation', [
      'navLinks'
    ]),
    ...mapState('user', [
      'isAuth',
      'user'
    ])
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
