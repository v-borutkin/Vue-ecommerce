import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    cartId: '',
    totalPrice: 0,
    cartList: []
  },
  mutations: {
    SET_CART_ID (state, payload) {
      state.cartId = payload
    },
    SET_CART_LIST (state, payload) {
      state.cartList = payload
    },
    CART_LIST_CLEAR (state, payload) {
      state.cartList = payload
    }
  },
  getters: {
    GET_TOTAL_PRICE (state) {
      state.cartList.forEach(item => {
        state.totalPrice += item.amount * item.quantity
      })
      return state.totalPrice
    },
    getCartId (state) {
      return state.cartId
    },
    GET_CART_LENGTH (state) {
      return state.cartList.length
    },
    GET_CART_LIST (state) {
      return state.cartList
    }
  },
  actions: {
    async ADD_TO_CART ({ commit, getters, dispatch }, productId) {
      try {
        await Axios.post('/to-cart/', {
          good: productId,
          cart: getters.getCartId,
          quantity: 1
        })
        dispatch('GET_CART_LIST_FROM_API')
      } catch (e) {
        console.log(e.error)
      }
    },
    async GET_CART_ID_FROM_API ({ commit }) {
      const cartID = await Axios.get('/carts/')
      commit('SET_CART_ID', cartID.data.results[0].id)
    },
    async GET_CART_LIST_FROM_API ({ commit }) {
      const cartList = await Axios.get('/to-cart/')
      commit('SET_CART_LIST', cartList.data.results)
    },
    async DELETE_FROM_CART ({ commit, dispatch }, payload) {
      await Axios.delete(`/cart-edit/${payload}`)
      dispatch('GET_CART_LIST_FROM_API')
    },
    async CART_LIST_CLEAR ({ commit }) {
      commit('CART_LIST_CLEAR', [])
    }
  }
}
