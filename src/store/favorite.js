import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {

  },
  mutations: {

  },
  actions: {
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
        })
    }
  },
  getters: {

  }
}
