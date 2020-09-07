import { getCategories } from '@/services/entities/categories'
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
      try {
        const categories = await getCategories()
        commit('setCategory', categories)
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}
