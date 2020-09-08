import {
  getProducts,
  getProduct,
  getRandomProduct
} from '@/services/entities/products'

export default {
  namespaced: true,
  state: {
    products: [],
    product: [],
    recommendedProducts: [],
    paginationCount: 1
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload.results
      state.paginationCount = Math.ceil(payload.count / 6)
    },
    setProduct (state, product) {
      state.product = product
    },
    setRecommendedProducts (state, products) {
      state.recommendedProducts = products
    }
  },
  actions: {
    async  getProducts ({ commit }, { category, page }) {
      try {
        const products = await getProducts({ category: category || 0, page })
        commit('setProducts', products)
      } catch (e) {
        Promise.reject(e)
      }
    },
    async  getRandomProduct ({ commit }) {
      try {
        const productsApi = await getRandomProduct()
        commit('setRecommendedProducts', productsApi.results)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getProduct ({ commit }, id) {
      try {
        const product = await getProduct(id)
        commit('setProduct', product)
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}
