<template >
  <b-container>
    <b-card class="item">
      <div class="d-flex justify-content-around">
        <b-card-text>
          <svg class="bi bi-chat-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M14 1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5a2 2 0 0 1 1.6.8L8 14.333 9.9 11.8a2 2 0 0 1 1.6-.8H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
          {{post.comments_count}}
        </b-card-text>
        <b-card-text>
          <svg class="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
            <path fill-rule="evenodd"
                  d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
          {{post.viewed}}
        </b-card-text>
      </div>
      <b-img :src="imgUrl(post.image)" width="680"></b-img>
      <h1>{{ post.title }}</h1>
      <h4>{{ post.author }}</h4>
      <h6>{{ post.category }}</h6>
      <p>{{ post.text }}</p>
      <div class="date">
        <p>{{formatDate(post.created_date)}}</p>
      </div>
    </b-card>
    <the-comments :comments="comments" :id="id" @sendMessage="sendMessage"/>
  </b-container>
</template>
<script>
import TheComments from './TheComments'
import imgUrl from '../../mixins/imgUrl'
import { mapActions, mapState } from 'vuex'
import formatDate from '../../mixins/formatDate'
export default {
  props: ['id'],
  mixins: [imgUrl, formatDate],
  name: 'Post',
  components: {
    TheComments
  },
  computed: {
    ...mapState({
      post: (state) => state.blog.post,
      comments: (state) => state.comments.comments
    })
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      await Promise.all([
        this.loadPost(this.id),
        this.getComments(this.id)
      ])
    },
    ...mapActions({
      loadPosts: 'blog/loadPosts',
      loadPost: 'blog/loadPost',
      sendComment: 'comment/sendComment',
      getComments: 'comments/getComments',
      setComment: 'comments/setComment'
    }),
    async sendMessage (message) {
      try {
        await this.setComment(message)
        this.getComments(this.id)
        this.message = ''
        this.$toasted.success('Комментарий успешно добавлен')
      } catch (e) {
        this.$toasted.error(e.response)
      }
    }
  }
}
</script>

<style scoped>
  img {
      display: block;
      padding-top: 10px;
      width: 20%;
      margin: 0 auto;
      object-fit: contain;
    }
</style>
