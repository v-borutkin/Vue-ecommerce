import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home/home'
import Posts from '@/components/Blog/Posts'
import Products from '@/components/Products/Products'
import Post from '@/components/Blog/Post'
import FavoriteList from '@/components/Favorite/FavoriteList'
import FavoriteItem from '@/components/Favorite/FavoriteItem'
import ProductCard from '@/components/Products/ProductCard'
import Auth from '@/components/auth/Auth'
import Cart from '@/components/Cart/Cart'

Vue.use(VueRouter)

const routes = [

  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'Posts', component: Posts },
  { path: '/products', name: 'Products', component: Products },
  { path: '/products/:id', name: 'Product', component: ProductCard, props: true },
  { path: '/blog/:id', name: 'Post', component: Post, props: true },
  { path: '/favorite/', name: 'Favorite', component: FavoriteList },
  { path: '/favorite/:id', name: 'FavoriteItem', component: FavoriteItem },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/cart', name: 'Cart', component: Cart }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
