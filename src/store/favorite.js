import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    favoriteProducts: []
  },
  mutations: {
    SET_FAVORITE_PRODUCTS (state, payload) {
      state.favoriteProducts = payload
    }
  },
  actions: {
    async FETCH_FAVORITE_PRODUCTS_FROM_API ({ commit }) {
      await Axios.get('/favorite/')
        .then(response => {
          commit('SET_FAVORITE_PRODUCTS', response.data.results)
        })
    },
    async SET_FAVORITE ({ commit, dispatch }, good) {
      Axios.post('/favorite/', { good })
        .then(() => {
          dispatch('products/FETCH_PRODUCTS_FROM_API', { }, { root: true })
        })
    },
    async DEL_FAVORITE ({ commit, dispatch }, good) {
      Axios.delete(`/favorite/${good}`)
        .then(() => {
          dispatch('products/FETCH_PRODUCTS_FROM_API', { }, { root: true })
          dispatch('FETCH_FAVORITE_PRODUCTS_FROM_API')
        })
    }
  }
}
