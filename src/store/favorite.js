import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    async SET_FAVORITE ({ commit, dispatch }, good) {
      Axios.post('/favorite/', { good })
        .then(response => {
          dispatch('GET_PRODUCTS_FROM_API')
        })
    },
    async DEL_FAVORITE ({ commit, dispatch }, good) {
      Axios.delete(`/favorite/${good}`)
        .then(response => {
          dispatch('GET_PRODUCTS_FROM_API')
        })
    }
  },
  getters: {

  }
}
