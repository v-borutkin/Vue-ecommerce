import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    setCategory (state, payload) {
      state.categories = payload
    }
  },
  actions: {
    async FETCH_CATEGORIES_FROM_API ({ commit }) {
      await Axios.get('/category/').then(response => {
        commit('setCategory', response.data.results)
      })
    }
  }
}
