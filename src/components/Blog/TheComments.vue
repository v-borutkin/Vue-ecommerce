<template lang="pug">
  .container.bootstrap.snippet
    .col-md-12
      .blog-comment
        h3.text-success.mt-3 Comments
        .panel
          .panel-body.justify-content-center
            form
              p(v-show='parentText') {{parentText}}
              textarea.form-control(:class="{'is-invalid': $v.message.$error}", rows='2',
                placeholder='Добавьте Ваш комментарий', v-model.trim='message', ref='textarea', name='textarea',
                @click='userClickForTextarea')
              .invalid-feedback(v-if='!$v.message.minLength || !$v.message.maxLength && $v.$dirty')
                | Комментарий должен быть минимум {{$v.message.$params.minLength.min}} знака
                | и максимум {{$v.message.$params.maxLength.max}}
              .clearfix
                input.btn.btn-sm.btn-primary.pull-left.mt-1(type='submit', value='Добавить', :disabled='!isAuth',
                  @click.prevent='sendMessage')
        ul.comments.mt-4
          v-comment-item(v-for='comment in comments', :key='comment.id', :comment='comment', :isAuth='isAuth',
            @sendReplyComment='sendReply')

</template>

<script>
import vCommentItem from './vCommentItem'
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Comments',
  props: ['comments', 'id'],
  components: {
    vCommentItem
  },
  validations: {
    message: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(245)
    }
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
        this.$v.message.$touch()
        let clildId = ''
        if (this.childId) {
          clildId = this.childId
        }
        if (!this.$v.$error) {
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
