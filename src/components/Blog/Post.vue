<template>
  <b-container>
    <b-card class="item">
      <b-img :src="GET_POST.image" width="680" />
      <h1>{{ GET_POST.title }}</h1>
      <h6>{{ GET_POST.author }}</h6>
      <p>{{ GET_POST.text }}</p>
    </b-card>
    <comments
      :comments="GET_COMMENTS"
      :id="id"
    />
  </b-container>
</template>

<script>
import Comments from './Comments'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['id'],
  name: 'Post',
  components: {
    Comments
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'GET_POST_FROM_API',
      'GET_COMMENTS_FROM_API',
      'SET_COMMENT_TO_API'
    ])
  },
  computed: {
    ...mapGetters([
      'GET_POST',
      'GET_COMMENTS',
      'IS_AUTH',
      'GET_USER'
    ])
  },
  mounted () {
    this.GET_POST_FROM_API(this.id)
    this.GET_COMMENTS_FROM_API(this.id)
  }
}
</script>

<style scoped>

</style>
