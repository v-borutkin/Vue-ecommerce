<template>
  <b-container>
    <b-card>
      <b-img :src="GET_POST.image" width="680" />
      <h1>{{ GET_POST.title }}</h1>
      <h6>{{ GET_POST.author }}</h6>
      <p>{{ GET_POST.text }}</p>
    </b-card>
    <comments   v-if="GET_COMMENTS.length"
                :comments="GET_COMMENTS"
                v-on:click="click"
                v-on:sendMessage="sendMessage"
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
    ]),
    click () {
      if (!this.IS_AUTH) {
        alert('Для отправки комментария авторизуйтесь')
      }
    },
    sendMessage (message) {
      if (this.IS_AUTH) {
        this.SET_COMMENT_TO_API({
          text: message,
          childrenId: false
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'GET_POST',
      'GET_COMMENTS',
      'IS_AUTH'
    ])
  },
  mounted () {
    this.GET_POST_FROM_API(parseInt(this.id))
    this.GET_COMMENTS_FROM_API(parseInt(this.id))
  }
}
</script>

<style scoped>

</style>
