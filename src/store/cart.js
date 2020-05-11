import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    geoApiKey: 'rxbbee9nZktOrDhlfruXp6iVSP7YSPt0',
    geoApiResponseLang: 'ru',
    countryId: 'RU',
    cartId: '',
    totalPrice: 0,
    promoPrice: 0,
    step: 1,
    promoCodeInfo: [],
    cartList: [],
  },
  mutations: {
    SET_CART_PRODUCT_LIST (state, payload) {
      state.cartList = payload
    },
    CART_LIST_CLEAR (state, payload) {
      state.cartList = payload
    },
    SET_CART_PRICE (state, payload) {
      state.totalPrice = payload
    },
    SET_PROMO_PRICE (state, payload) {
      state.promoPrice = payload
    },
    SET_PROMO_CODE_INFO (state, payload) {
      state.promoCodeInfo = payload
    },
  },
  getters: {
    GET_PROMO_PRICE (state) {
      if (state.promoPrice !== null) {
        return state.promoPrice
      } else {
        return false
      }
    },
    GET_TOTAL_PRICE (state) {
      return state.totalPrice
    },
    GET_CART_LENGTH (state) {
      return state.cartList.length
    },
    GET_CART_LIST (state) {
      return state.cartList
    },
    GET_PROMO_CODE_INFO (state) {
      return state.promoCodeInfo
    }
  },
  actions: {
    async SEND_PROMO ({ commit }, promoCode) {
      return await Axios.post('/promo/', {
        promo_code: promoCode
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
    async GET_CART_LIST_FROM_API ({ commit }) {
      await Axios.get('/carts/')
        .then(response => {
          commit('SET_PROMO_CODE_INFO', response.data.results[0].promo_code)
          commit('SET_PROMO_PRICE', response.data.results[0].promo_price)
          commit('SET_CART_PRICE', response.data.results[0].amount_items)
          commit('SET_CART_PRODUCT_LIST', response.data.results[0].goods)
        })
    },
    async DELETE_FROM_CART ({ commit, dispatch }, payload) {
      await Axios.delete(`/cart-edit/${payload}`).then(() => {
        dispatch('GET_CART_LIST_FROM_API')
      })
    },
    async CART_LIST_CLEAR ({ commit }) {
      commit('CART_LIST_CLEAR', [])
    }
  }
}
