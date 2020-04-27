import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'
import router from '../router'

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
    async REGISTRATION_CONFIRM ({ commit }, registrationToken) {
      return Axios.post('/rest-auth/registration/verify-email/', {
        key: registrationToken
      })
    },
    async REGISTRATION ({ state, commit }, { username, email, password1, password2 }) {
      return await Axios.post('/rest-auth/registration/', {
        username, email, password1, password2
      })
    },
    async AUTH ({ commit, dispatch }, { username, password }) {
      return await Axios.post('/rest-auth/login/', {
        username, password
      }).then(response => {
        localStorage.setItem('token', response.data.key)
        dispatch('GET_CART_LIST_FROM_API')
        commit('AUTH', true)
        router.push('/')
      })
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
