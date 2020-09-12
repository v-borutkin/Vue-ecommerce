import {
  getProductFavoriteList,
  setFavorite,
  delFavorite
} from '@/services/entities/favorite'

export default {
  namespaced: true,
  state: {
    favoriteProducts: []
  },
  actions: {
    async getProductFavoriteList ({ commit }) {
      try {
        const favoriteList = await getProductFavoriteList()
        commit('setProductFavoriteList', favoriteList)
        return null
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async setFavorite ({ commit, rootState }, productId) {
      commit('addFavorite', productId)
      commit('products/addFavorite', productId)

      try {
        await setFavorite(productId)
      } catch (e) {
        commit('delFavorite', productId)
        commit('products/delFavorite', productId)
      }
    },
    async deleteFavorite ({ commit }, productId) {
      commit('delFavorite', productId)
      commit('products/delFavorite', productId)

      try {
        await delFavorite(productId)
      } catch (e) {
        commit('addFavorite', productId)
        commit('products/addFavorite', productId)
      }
    }
  },
  mutations: {
    setProductFavoriteList (state, payload) {
      state.favoriteProducts = payload
    },
    addFavorite (rootState, state, productId) {
      state.favoriteProducts.push(rootState.products.products.find((item) => item.id === productId))
    },
    delFavorite (state, productId) {
      delete state.favoriteProducts.find((item) => item.id === productId)
    }
  }
}
