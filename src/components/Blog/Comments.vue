<template>
  <div class="container bootstrap snippet">
    <div class="col-md-12">
      <div class="blog-comment">
        <h3 class="text-success mt-3">Comments</h3>
        <hr/>
        <ul class="comments">
          <comment-item
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
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
  props: ['comments'],
  components: {
    CommentItem
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
