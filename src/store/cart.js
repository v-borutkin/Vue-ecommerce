import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    cartId: '',
    cartItem: [

    ]
  },
  getters: {
    getCartId (state) {
      return state.cartId
    }
  },
  mutations: {
    SET_CART_ID (state, payload) {
      state.cartId = payload
    }
  },
  actions: {
    async ADD_TO_CART ({ commit, getters }, productId) {
      console.log(getters.getCartId)
      await Axios.post('/to-cart/', {
        good: productId,
        cart: getters.getCartId
      })
    },
    async GET_CART_ID_FROM_API ({ commit }) {
      const cartID = await Axios.get('/carts/')
      commit('SET_CART_ID', cartID.data.results[0].id)
    }
  }
}
