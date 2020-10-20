import { loadComments, setBlogPostComment } from '@/services/entities/comments'

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

    async setComment ({ commit, dispatch }, message) {
      const comment = {
        ...message,
        moderation: false
      }
      if (message.childrenId) {
        delete comment.post
      }
      try {
        await setBlogPostComment(comment)
      } catch (e) {
        return Promise.reject(e)
      }
    }
  },
  getters: {
    GET_COMMENTS (state) {
      return state.comments
    }
  }
}
