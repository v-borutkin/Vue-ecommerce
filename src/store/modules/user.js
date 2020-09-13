import {
  passwordReset,
  registrationConfirm,
  registration,
  auth,
  sendNewPassword
} from '@/services/entities/user'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isAuth: false,
    user: {
      userId: 0,
      userName: null
    }
  },
  actions: {
    async passwordReset (ctx, email) {
      try {
        return await passwordReset(email)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async registrationConfirm ({ commit }, registrationToken) {
      try {
        return await registrationConfirm({
          key: registrationToken
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async registration ({ state, commit }, { username, email, password1, password2 }) {
      try {
        return await registration({
          username, email, password1, password2
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async auth ({ commit, dispatch }, { username, password }) {
      try {
        const user = await auth({ username, password })
        localStorage.setItem('token', user.key)
        dispatch('cart/GET_CART_LIST_FROM_API', {}, { root: true })
        commit('IS_AUTH', true)
        commit('AUTH', user)
        router.back(-1)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async sendNewPassword ({ commit }, { newPassword, newPasswordConfirm }) {
      try {
        return await sendNewPassword({
          new_password1: newPassword,
          new_password2: newPasswordConfirm
        })
      } catch (e) {
        return Promise.reject(e)
      }
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
  }
}
