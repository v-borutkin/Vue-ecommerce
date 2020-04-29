import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  state: {
    comments: [

    ]
  },
  mutations: {
    loadComments (state, payload) {
      state.comments = payload
    }
  },
  actions: {
    async GET_COMMENTS_FROM_API ({ commit, dispatch }, postID) {
      try {
        const commentsApi = await Axios.get(`/comments/post_id=${postID}`)
        commit('loadComments', commentsApi.data.results)
      } catch (e) {
      }
    },

    SET_COMMENT_TO_API: async function ({ commit, dispatch }, { text, post, author, childrenId = '' }) {
      const pes = {
        text,
        post,
        author,
        moderation: false
      }
      if (childrenId) {
        delete pes.post
      } else {
        pes.post = post
      }
      await Axios.post(`http://77.66.177.88:8181/api/v1/comments/${childrenId}`, pes)
    }
  },
  getters: {
    GET_COMMENTS (state) {
      return state.comments
    }
  }
}
