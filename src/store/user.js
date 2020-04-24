import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    isAuth: ''
  },
  getters: {
    IS_AUTH (state) {
      return state.isAuth
    }
  },
  mutations: {
    AUTH (state, payload) {
      state.isAuth = payload
    }
  },
  actions: {
    async AUTH ({ commit, dispatch }, { username, password }) {
      try {
        const postsApi = await Axios.post('/rest-auth/login/', {
          username: username,
          password: password
        })
        if (postsApi.data.key) {
          localStorage.setItem('token', postsApi.data.key)
          commit('AUTH', true)
          dispatch('GET_CART_LIST_FROM_API')
        }
      } catch (e) {
      }
    },
    LOGOUT ({ commit, dispatch }) {
      commit('AUTH', false)
      localStorage.removeItem('token')
      dispatch('CART_LIST_CLEAR')
    },
    TO_AUTH ({ commit }) {
      commit('AUTH', true)
    }
  }
}
