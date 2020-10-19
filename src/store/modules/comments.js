import { loadComments } from '@/services/entities/comments'

export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    getComments (state, payload) {
      state.comments = payload
    }
  },
  actions: {
    async getComments ({ commit }, postID) {
      try {
        const comments = await loadComments({ post_id: postID })
        commit('getComments', comments.results)
      } catch (e) {
        return Promise.reject(e)
      }
    },

    async SET_COMMENT_TO_API ({ commit, dispatch }, { text, post, author, childrenId = '' }) {
      const comment = {
        text,
        post,
        author,
        moderation: false
      }
      if (childrenId) {
        delete comment.post
      } else {
        comment.post = post
      }
      // await Axios.post(`/comments/${childrenId}`, pes)
    }
  },
  getters: {
    GET_COMMENTS (state) {
      return state.comments
    }
  }
}
