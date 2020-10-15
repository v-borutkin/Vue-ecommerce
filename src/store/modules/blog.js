import {
  loadPosts,
  loadPost
} from '@/services/entities/blog'

export default {
  namespaced: true,
  state: {
    _myData: false,
    posts: [],
    post: {},
    paginationCount: 1
  },
  mutations: {
    set_myData (state, payload) {
      state._myData = payload
    },
    setPosts (state, posts) {
      state.posts = posts.results
      state.paginationCount = Math.ceil(posts.count / 6)
    },
    setPost (state, post) {
      state.post = post
    }
  },
  actions: {
    async  loadPosts ({ commit }, currentPage) {
      try {
        const posts = await loadPosts({ page: currentPage })
        commit('setPosts', posts)
        commit('set_myData', true)
      } catch (e) {
      }
    },
    async loadPost ({ commit }, id) {
      try {
        const post = await loadPost(id)
        commit('setPost', post)
      } catch (e) {
      }
    }
  }
}
