<template>
  <b-container>
    <b-card class="item">
      <b-img :src="imgUrl(post.image)" width="680" />
      <h1>{{ post.title }}</h1>
      <h6>{{ post.author }}</h6>
      <p>{{ post.text }}</p>
    </b-card>
    <comments
      :comments="comments"
      :id="id"
    />
  </b-container>
</template>

<script>
import Comments from './Comments'
import imgUrl from '../../mixins/imgUrl'
import { mapActions, mapState } from 'vuex'
export default {
  props: ['id'],
  mixins: [imgUrl],
  name: 'Post',
  components: {
    Comments
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('blog', [
      'FETCH_POSTS_FROM_API',
      'FETCH_POST_FROM_API'
    ]),
    ...mapActions('comments', [
      'SET_COMMENT_TO_API'
    ])
  },
  computed: {
    ...mapState('blog', [
      'post'
    ]),
    ...mapState('comments', [
      'comments'
    ])
  },
  mounted () {
    this.FETCH_POSTS_FROM_API(this.id)
    this.FETCH_POST_FROM_API(this.id)
  }
}
</script>

<style scoped>

</style>
