<template>
  <b-container>
      <b-col>
        <div v-if="GET_POSTS" class="d-flex flex-row flex-wrap">
          <b-card id="products" v-for="post in GET_POSTS"
                  :key="post.id"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 item"
          >
            <div>
              <img :src="imgUrl(post.image)" alt="Card image">
            </div>

              <b-card-title class="mt-2">
                <router-link :to="'blog/' + post.id">{{post.title}}</router-link>
              </b-card-title>

            <b-card-sub-title class="mb-3">
              <a href="#">Автомобиль</a>
            </b-card-sub-title>
              <b-card-text>
                {{post.short_text}}
              </b-card-text>
          </b-card>
        </div>
      </b-col>
      <v-pagination
                    v-model="currentPage"
                    :page-count="GET_PAGINATION_COUNT"
                    :classes="bootstrapPaginationClasses" >
      </v-pagination>
    </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    this.fetchPostsFromApi()
  },
  computed: {
    ...mapGetters([
      'GET_POSTS',
      'GET_PAGINATION_COUNT'
    ])
  },
  methods: {
    ...mapActions([
      'GET_POSTS_FROM_API'
    ]),
    fetchPostsFromApi () {
      this.GET_POSTS_FROM_API(1)
    }
  },
  watch: {
    currentPage () {
      this.GET_POSTS_FROM_API(this.currentPage)
    }
  }
}
</script>
<style scoped>
  .item {
    margin: 10px 10px;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }
  h6 a{
    color: #6c757d;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  img{
    width: 19.9rem;
    height: 200px;
    margin-left: -20px;
    margin-top: -20px;
  }
</style>
