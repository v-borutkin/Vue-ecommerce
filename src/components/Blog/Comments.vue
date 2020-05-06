<template>
  <div class="container bootstrap snippet">
    <div class="col-md-12">
      <div class="blog-comment">
        <h3 class="text-success mt-3">Comments</h3>
        <div class="panel">
          <div class="panel-body  justify-content-center">
            <textarea class="form-control"
                      rows="2"
                      placeholder="Добавьте Ваш комментарий"
                      v-model="message"
                      ref="textarea"
                      name="textarea"
                      @click="userClickForTextarea"
            >
            </textarea>
            <div class="clearfix">
              <input type="submit"
                     class="btn btn-sm btn-primary pull-left mt-1"
                     value="Добавить"
                     @click="sendMessage"
              >
            </div>
          </div>
        </div>
        <ul class="comments mt-4">
          <comment-item
            v-for="comment in comments"
            :key="comment.id"
            :Comment="comment"
            v-on:sendReplyComment="sendReply"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Comments',
  props: ['comments', 'id'],
  components: {
    CommentItem
  },
  data () {
    return {
      message: '',
      isChild: false,
      childId: ''
    }
  },
  computed: {
    ...mapGetters([
      'IS_AUTH',
      'GET_USER'
    ])
  },
  methods: {
    ...mapActions([
      'SET_COMMENT_TO_API',
      'GET_COMMENTS_FROM_API'
    ]),
    sendReply (id) {
      this.childId = id
      this.$refs.textarea.focus()
      this.$route.to('#textarea')
    },
    userClickForTextarea () {
      if (!this.IS_AUTH) {
        alert('Для отправки комментария авторизуйтесь')
      }
    },
    sendMessage () {
      if (this.IS_AUTH) {
        let clildId = ''
        if (this.childId) {
          clildId = this.childId
        }
        this.SET_COMMENT_TO_API({
          text: this.message,
          post: this.id,
          author: this.GET_USER.userId,
          childrenId: clildId
        }).then(response => {
          this.GET_COMMENTS_FROM_API(this.id)
          this.message = ''
        }).catch(error => {
          alert(`произошла ошибка + ${error.response}`)
        })
      }
    }
  }
}
</script>

<style scoped>
  .blog-comment ul{
    list-style-type: none;
    padding: 0;
  }

  .blog-comment {
    margin-left: -30px;
    margin-right: -30px;
  }
  .blog-comment ul.comments ul{
    list-style-type: none;
    padding: 0;
    margin-left: 85px;
  }

  .blog-comment h3,
  .blog-comment-form h3{
    font-size: 26px;
    line-height: 30px;
    font-weight: 800;
  }
</style>
