<template>
  <div>
    <li class="clearfix">
      <img src="https://bootdey.com/img/Content/user_1.jpg" class="avatar" alt="">
      <div class="post-comments">
        <div class=" header_comment d-inline-flex meta justify-content-between">
          <p>{{ Comment.created_date  | dateFilter}}</p>
          <a class="author" href="#">{{ Comment.author }}</a>
          <b-button class="btn btn-info rounded-right"
                    size="sm"
                    v-if="isReply"
                    @click.prevent="sendReply(Comment.id)">
            Reply
          </b-button>
        </div>
        <p :style="{ fontStyle: textStyle }">
          {{Comment.text}}
        </p>
        <comment-item
          v-for="comment in Comment.child_comment"
          :key="comment.id"
          :Comment="comment"
          :isReply="false"
          textStyle="italic"
        />
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    Comment: {
      type: Object,
      required: true
    },
    isReply: {
      type: Boolean,
      required: false,
      default: true
    },
    textStyle: {
      type: String,
      required: false,
      default: 'normal'
    }
  },
  methods: {
    sendReply (id) {
      this.$emit('sendReplyComment', id)
    }
  },
  filters: {
    dateFilter (value) {
      return value.toString().replace('T', ' ').substr(0, 19)
    }
  }
}
</script>

<style scoped>
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #FFFFFF;
  }
  .header_comment {
    width: 100%
  }
  .author {
    font-size: 14px;
  }
  a {
    color: #82b440;
    text-decoration: none;
  }
  .blog-comment img{
    opacity: 1;
    filter: Alpha(opacity=100);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
  }

  .blog-comment img.avatar {
    position: relative;
    float: left;
    margin-left: 0;
    margin-top: 0;
    width: 65px;
    height: 65px;
  }

  .blog-comment .post-comments{
    border: 1px solid #eee;
    margin-bottom: 20px;
    margin-left: 85px;
    margin-right: 0;
    padding: 10px 20px;
    position: relative;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    background: #fff;
    color: #6b6e80;
  }

  .blog-comment .meta {
    font-size: 13px;
    color: #aaaaaa;
    padding-bottom: 8px;
    margin-bottom: 10px !important;
    border-bottom: 1px solid #eee;
  }
</style>
