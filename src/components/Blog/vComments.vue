<template>
  <div class="container bootstrap snippet">
    <div class="col-md-12">
      <div class="blog-comment">
        <h3 class="text-success mt-3">Comments</h3>
        <div class="panel">
          <div class="panel-body  justify-content-center">
            <p v-show="parentText">{{parentText}}</p>
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
                     :disabled="!isAuth"
                     @click="sendMessage">
            </div>
          </div>
        </div>
        <ul class="comments mt-4">
          <v-comment-item
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :isAuth="isAuth"
            @sendReplyComment="sendReply"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vCommentItem from './vCommentItem'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Comments',
  props: ['comments', 'id'],
  components: {
    vCommentItem
  },
  data () {
    return {
      message: '',
      isChild: false,
      parentText: '',
      childId: ''
    }
  },
  mounted () {
    this.FETCH_COMMENTS_FROM_API(this.id)
  },
  computed: {
    ...mapState('user', [
      'isAuth',
      'user'
    ])
  },
  methods: {
    ...mapActions('comments', [
      'SET_COMMENT_TO_API',
      'FETCH_COMMENTS_FROM_API'
    ]),
    sendReply (id, parentText) {
      this.childId = id
      this.parentText = parentText
      this.$refs.textarea.focus()
      this.$router.push('#textarea')
    },
    userClickForTextarea () {
      if (!this.isAuth) {
        alert('Для отправки комментария авторизуйтесь')
      }
    },
    sendMessage () {
      if (this.isAuth) {
        let clildId = ''
        if (this.childId) {
          clildId = this.childId
        }
        this.SET_COMMENT_TO_API({
          text: this.message,
          post: this.id,
          author: this.user.userId,
          childrenId: clildId
        }).then(() => {
          this.FETCH_COMMENTS_FROM_API(this.id)
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
