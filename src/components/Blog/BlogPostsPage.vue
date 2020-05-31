<template lang="pug">
  b-container
    b-col
      .d-flex.flex-wrap.flex-md-row.flex-column.justify-content-sm-center.justify-content-lg-around.align-items-center
      .col-12(v-if='posts')
        b-card#products.mb-2.item(v-for='post in posts', :key='post.id', tag='article', style='max-width: 20rem;')
          img(:src='imgUrl(post.image)', alt='Card image')
          b-card-title.mt-1
            router-link(:to="'blog/' + post.id") {{post.title}}
          b-card-text
            <svg class="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            </svg>  {{post.author}}
          b-card-sub-title.mb-3
            a(href='#') {{post.category}}
          b-card-text {{post.short_text}}
          .d-flex.justify-content-around
            b-card-text
              <svg class="bi bi-chat-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5a2 2 0 0 1 1.6.8L8 14.333 9.9 11.8a2 2 0 0 1 1.6-.8H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              </svg> {{post.comments_count}}
            b-card-text
              <svg class="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
                <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>  {{post.viewed}}
          .date
            p {{formatDate(post.created_date)}}
    v-pagination(v-if='paginationCount > 1', v-model='currentPage', :page-count='paginationCount', :classes='bootstrapPaginationClasses')
</template>

<script>
import { mapActions, mapState } from 'vuex'
import vPagination from 'vue-plain-pagination'
import imgUrl from '../../mixins/imgUrl'
import formatDate from '../../mixins/formatDate'

export default {
  components: {
    vPagination
  },
  mixins: [imgUrl, formatDate],
  data () {
    return {
      isLoading: true,
      currentPage: 1,
      bootstrapPaginationClasses: {
        ul: 'pagination',
        li: 'page-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link'
      }
    }
  },
  mounted () {
    if (this._myData === false) this.fetchPostsFromApi()
  },
  computed: {
    ...mapState('blog', [
      'posts',
      '_myData',
      'paginationCount'
    ])
  },
  methods: {
    ...mapActions('blog', [
      'FETCH_POSTS_FROM_API'
    ]),
    fetchPostsFromApi () {
      this.FETCH_POSTS_FROM_API(1)
    }
  },
  watch: {
    currentPage () {
      this.fetchPostsFromApi()
    }
  }
}
</script>
<style scoped>
  .item {
    margin: 10px 10px;
  }
  img {
    display: block;
    padding-top: 10px;
    width: 20%;
    margin: 0 auto;
    object-fit: contain;
  }
  h6 a{
    color: #6c757d;
  }
  img{
    width: 19.9rem;
    height: 200px;
    margin-left: -20px;
    margin-top: -20px;
  }
</style>
