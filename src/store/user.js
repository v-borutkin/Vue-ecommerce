import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'
import router from '../router'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    isAuth: false,
    user: {
      userId: 0,
      userName: ''
    }
  },
  getters: {
    IS_AUTH_TOKEN (state) {
      return !!localStorage.getItem('token')
    }
  },
  mutations: {
    IS_AUTH (state, payload) {
      state.isAuth = payload
    },
    AUTH (state, payload) {
      state.user.userId = payload.id
      localStorage.setItem('userId', payload.id)

      state.user.userName = payload.username
      localStorage.setItem('userName', payload.username)
    },
    UPDATE_USER (state) {
      const userName = localStorage.getItem('userName')
      const userId = localStorage.getItem('userId')

      state.user.userId = userId
      state.user.userName = userName
    }
  },
  actions: {
    async RECOVERY_PASSWORD ({ commit }, email) {
      return await Axios.post('/rest-auth/password/reset/', { email })
    },
    async REGISTRATION_CONFIRM ({ commit }, registrationToken) {
      return Axios.post('/rest-User/registration/verify-email/', {
        key: registrationToken
      })
    },
    async REGISTRATION ({ state, commit }, { username, email, password1, password2 }) {
      return await Axios.post('/rest-User/registration/', {
        username, email, password1, password2
      })
    },
    async AUTH ({ commit, dispatch }, { username, password }) {
      return await Axios.post('/rest-auth/login/', {
        username, password
      }).then(response => {
        localStorage.setItem('token', response.data.key)
        dispatch('cart/GET_CART_LIST_FROM_API', {}, { root: true })
        commit('IS_AUTH', true)
        commit('AUTH', response.data.user)
        router.back(-1)
      })
    },
    LOGOUT ({ commit, dispatch }) {
      commit('IS_AUTH', false)
      localStorage.removeItem('token')
      dispatch('cart/CART_LIST_CLEAR', {}, { root: true })
    },
    TO_AUTH ({ commit }) {
      commit('IS_AUTH', true)
      commit('UPDATE_USER')
    }
  }
}
