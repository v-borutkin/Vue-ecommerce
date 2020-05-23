<template lang="pug">
  b-container
    b-col
      .d-flex.flex-wrap.flex-md-row.flex-column.justify-content-sm-center.justify-content-lg-around.align-items-center
      .col-12(v-if='posts')
        b-card#products.mb-2.item(v-for='post in posts', :key='post.id', tag='article', style='max-width: 20rem;')
          div
            img(:src='imgUrl(post.image)', alt='Card image')
          b-card-title.mt-2
            router-link(:to="'blog/' + post.id") {{post.title}}
          b-card-sub-title.mb-3
            a(href='#') Автомобиль
          b-card-text
            | {{post.short_text}}
    v-pagination(v-if='paginationCount > 1', v-model='currentPage', :page-count='paginationCount', :classes='bootstrapPaginationClasses')
</template>

<script>
import { mapActions, mapState } from 'vuex'
import vPagination from 'vue-plain-pagination'
import imgUrl from '../../mixins/imgUrl'

export default {
  components: {
    vPagination
  },
  mixins: [imgUrl],
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
    console.log(this.posts)
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
      this.FETCH_POSTS_FROM_API(this.currentPage)
    }
  }
}
</script>
<style scoped>
  .item {
    margin: 10px 10px;
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
