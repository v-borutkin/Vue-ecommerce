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
    async setFavorite ({ commit }, productId) {
      commit('products/addFavorite', productId, { root: true })
      try {
        await setFavorite({ good: productId })
      } catch (e) {
        commit('products/delFavorite', productId)
        return Promise.reject(e)
      }
    },
    async deleteFavorite ({ store, commit }, productId) {
      commit('products/delFavorite', productId, { root: true })
      try {
        await delFavorite({ good: productId })
      } catch (e) {
        commit('products/addFavorite', productId, { root: true })
        return Promise.reject(e)
      }
    }
  },
  mutations: {
    addFavorite ({ state, rootState }, productId) {
      state.favoriteProducts.push(rootState.products.products.find((item) => item.id === productId))
    },
    delFavorite (state, productId) {
      delete state.favoriteProducts.find((item) => item.id === productId)
    }
  }
}
