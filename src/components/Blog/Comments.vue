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
                      @click="userClickForTextarea"
            >
            </textarea>
            <div class="clearfix">
              <input type="submit"
                     class="btn btn-sm btn-primary pull-left mt-1"
                     value="Добавить"
                     @click="sendComment"
              >
            </div>
          </div>
        </div>
        <ul class="comments mt-4">
          <comment-item
            v-for="comment in comments"
            :key="comment.id"
            :Comment="comment"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem'

export default {
  name: 'Comments',
  props: ['comments', 'id'],
  components: {
    CommentItem
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    userClickForTextarea () {
      this.$emit('click')
    },
    sendComment () {
      this.$emit('sendMessage', this.message)
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
