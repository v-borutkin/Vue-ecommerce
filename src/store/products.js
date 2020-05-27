import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

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
    setProduct (state, payload) {
      state.product = payload
    },
    setRecommendedProducts (state, payload) {
      state.recommendedProducts = payload
    }
  },
  actions: {
    async  FETCH_PRODUCTS_FROM_API ({ commit }, { category = 0, page }) {
      try {
        await Axios.get(`/goods/category=${category}?page=${page}`).then(response => {
          commit('setProducts', response.data)
        })
      } catch (e) {
      }
    },
    async  FETCH_RECOMMENDED_PRODUCTS_FROM_API ({ commit }) {
      try {
        const productsApi = await Axios.get('/goods-random/')
        commit('setRecommendedProducts', productsApi.data.results)
      } catch (e) {

      }
    },
    async FETCH_PRODUCT_FROM_API ({ commit }, id) {
      const productApi = await Axios.get(`http://77.66.177.88:8181/api/v1/goods-ops/${id}`)
      commit('setProduct', productApi.data)
    }
  }
}
