import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    products: [

    ],
    product: [

    ],
    recommendedProducts: [

    ]
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.product = payload
    },
    setRecommendedProducts (state, payload) {
      state.recommendedProducts = payload
    }
  },
  actions: {
    async  GET_PRODUCTS_FROM_API ({ commit }) {
      try {
        const productsApi = await Axios.get('/goods/?category=0')
        commit('setProducts', productsApi.data.results)
      } catch (e) {

      }
    },

    async  GET_RECOMMENDED_PRODUCTS_FROM_API ({ commit }) {
      try {
        const productsApi = await Axios.get('/goods-random/')
        commit('setRecommendedProducts', productsApi.data.results)
      } catch (e) {

      }
    },

    async GET_PRODUCT_FROM_API ({ commit }, id) {
      const productApi = await Axios.get(`http://77.66.177.88:8181/api/v1/goods-ops/${id}`)
      commit('setProduct', productApi.data)
    }
  },
  getters: {
    GET_PRODUCTS (state) {
      return state.products
    },
    GET_PRODUCT (state) {
      return state.product
    },
    GET_RECOMMENDED_PRODUCTS (state) {
      return state.recommendedProducts
    }
  }
}
