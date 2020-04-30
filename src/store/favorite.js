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
      return Axios.post('/favorite/', { good })
    },
    async DEL_FAVORITE ({ commit, dispatch }, good) {
      return Axios.delete('/favorite/', { good })
    }
  },
  getters: {

  }
}
