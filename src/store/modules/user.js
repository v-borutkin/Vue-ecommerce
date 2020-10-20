import { auth, passwordReset, registration, registrationConfirm, sendNewPassword } from '@/services/entities/user'
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
        commit('isAuth', true)
        commit('auth', user)
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
    logout ({ commit, dispatch }) {
      commit('isAuth', false)
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      dispatch('cart/CART_LIST_CLEAR', {}, { root: true })
    },
    toAuth ({ commit }) {
      commit('isAuth', true)
      commit('userUpdate')
    }
  },
  getters: {
    IS_AUTH_TOKEN (state) {
      return !!localStorage.getItem('token')
    }
  },
  mutations: {
    isAuth (state, user) {
      state.isAuth = user
    },
    auth (state, { user }) {
      state.user.userId = user.id
      localStorage.setItem('userId', user.id)
      state.user.userName = user.username
      localStorage.setItem('userName', user.username)
    },
    userUpdate (state) {
      state.user.userId = localStorage.getItem('userId')
      state.user.userName = localStorage.getItem('userName')
    }
  }
}
