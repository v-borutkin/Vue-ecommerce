import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    cartId: '',
    totalPrice: 0,
    step: 1,
    cartList: [],
    promoInfo: []
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
    },
    SET_PROMO_INFO (state, payload) {
      state.promoInfo = payload[0]
    }
  },
  getters: {
    GET_PROMO (state) {
      return state.promoInfo
    },
    GET_TOTAL_PRICE (state) {
      state.totalPrice = 0
      state.cartList.forEach(item => {
        state.totalPrice += item.good.price * item.quantity
      })
      return state.totalPrice
    },
    getCartId (state) {
      return state.cartId
    }, // TODO ФИКС
    GET_CART_LENGTH (state) {
      return state.cartList.length
    },
    GET_CART_LIST (state) {
      return state.cartList
    }
  },
  actions: {
    async SEND_PROMO ({ commit }, promoText) {
      return await Axios.post('/promo/', {
        promo_code: promoText
      })
    },
    async GET_PROMO_INFO_FROM_API ({ commit }) {
      await Axios.get('/promo/').then(response => {
        commit('SET_PROMO_INFO', response.data.results)
      })
    },
    async ADD_TO_CART ({ getters, dispatch }, productId) {
      await Axios.post('/to-cart/', {
        good: productId,
        cart: getters.getCartId,
        quantity: 1
      })
        .then(response => {
          dispatch('GET_CART_LIST_FROM_API')
          dispatch('GET_PRODUCTS_FROM_API')
        })
    },
    async CART_ELEMENT_PLUS ({ dispatch, state }, { productId, quantity }) {
      const q = quantity + state.step
      await Axios.put(`/cart-edit/${productId}`, {
        quantity: q
      }).then(response => {
        dispatch('GET_CART_LIST_FROM_API')
      })
    },
    async CART_ELEMENT_MINUS ({ dispatch, state }, { productId, quantity }) {
      const q = quantity - state.step
      await Axios.put(`/cart-edit/${productId}`, {
        quantity: q
      }).then(response => {
        dispatch('GET_CART_LIST_FROM_API')
      })
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
