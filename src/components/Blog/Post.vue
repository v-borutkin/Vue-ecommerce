<template>
  <b-container>
    <b-card>
      <b-img :src="GET_POST.image" width="980" />
      <h1>{{ GET_POST.title }}</h1>
      <h6>{{ GET_POST.author }}</h6>
      <p>{{ GET_POST.text }}</p>
    </b-card>
    <comments   v-if="GET_COMMENTS.length" :comments="GET_COMMENTS"/>
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
      'GET_COMMENTS_FROM_API'
    ])
  },
  computed: {
    ...mapGetters([
      'GET_POST',
      'GET_COMMENTS'
    ])
  },
  mounted () {
    this.GET_POST_FROM_API(parseInt(this.id))
    this.GET_COMMENTS_FROM_API(parseInt(this.id))
  }
}
</script>

<style scoped>
  body{
    background:#eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #FFFFFF;
  }
  a {
    color: #82b440;
    text-decoration: none;
  }
  .blog-comment::before,
  .blog-comment::after,
  .blog-comment-form::before,
  .blog-comment-form::after{
    content: "";
    display: table;
    clear: both;
  }

  .blog-comment ul{
    list-style-type: none;
    padding: 0;
  }
  .text-success {
    margin-left: 50px;
  }
  .blog-comment {
    margin-left: -30px;
    margin-right: -30px;
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
    margin-right: 0px;
    padding: 10px 20px;
    position: relative;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    background: #fff;
    color: #6b6e80;
    position: relative;
  }

  .blog-comment .meta {
    font-size: 13px;
    color: #aaaaaa;
    padding-bottom: 8px;
    margin-bottom: 10px !important;
    border-bottom: 1px solid #eee;
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
