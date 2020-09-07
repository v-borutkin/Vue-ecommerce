export default {
  namespaced: true,
  state: {
    loading: true,
    error: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },

    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },

  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }

  }
}
