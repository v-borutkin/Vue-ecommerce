<template lang="pug">
  b-container
    b-card.item
      b-img(:src='imgUrl(post.image)', width='680')
      h1 {{ post.title }}
      h6 {{ post.author }}
      p {{ post.text }}
    the-comments(:comments='comments', :id='id')
</template>

<script>
import TheComments from './TheComments'
import imgUrl from '../../mixins/imgUrl'
import { mapActions, mapState } from 'vuex'
export default {
  props: ['id'],
  mixins: [imgUrl],
  name: 'Post',
  components: {
    TheComments
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
    this.FETCH_POST_FROM_API(this.id)
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
