import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './navigation'
import slider from './slider'
import auth from './user'
import blog from './blog'
import shared from './shared'
import favorite from './favorite'
import products from './products'
import comments from './comments'
import cart from './cart'

Vue.use(Vuex)
export default new Vuex.Store({ // TODO сделать единый отлов ошибок
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    navigation,
    slider,
    auth,
    blog,
    shared,
    favorite,
    products,
    comments,
    cart
  }
})
