import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    posts: [
    ],
    post: {},
    paginationCount: 1
  },
  mutations: {
    loadPosts (state, payload) {
      state.posts = payload.data.results
      state.paginationCount = Math.ceil(payload.data.count / 6)
    },
    loadPost (state, payload) {
      state.post = payload
    }
  },
  actions: {
    async  GET_POSTS_FROM_API ({ commit, dispatch }, currentPage) {
      try {
        const postsApi = await Axios.get(`/posts/?page=${currentPage}`)
        commit('loadPosts', postsApi)
      } catch (e) {
      }
    },
    async GET_POST_FROM_API ({ commit, dispatch }, id) {
      try {
        const postApi = await Axios.get(`/post-ops/${id}`)
        commit('loadPost', postApi.data)
      } catch (e) {
      }
    }
  },
  getters: {
    GET_POSTS (state) {
      return state.posts
    },
    GET_POST: state => { // TODO фикс
      return state.post
    },
    /**
     * @return {number}
     */
    GET_PAGINATION_COUNT (state) {
      return state.paginationCount
    }
  }
}
