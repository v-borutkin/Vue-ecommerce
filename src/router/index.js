import Vue from 'vue'
import VueRouter from 'vue-router'
const Registration = () => import('@/components/auth/vRegistration')
const Posts = () => import('@/components/Blog/vPosts')
const Products = () => import('@/components/Products/vProducts')
const Post = () => import('@/components/Blog/vPost')
const FavoriteList = () => import('@/components/Favorite/vFavoriteList')
const FavoriteItem = () => import('@/components/Favorite/vFavoriteItem')
const ProductCard = () => import('@/components/Products/vProductCard')
const Auth = () => import('@/components/auth/vAuth')
const Cart = () => import('@/components/Cart/vCart')
const Home = () => import('@/components/Home/vHome')
const RegistrationConform = () => import('@/components/auth/vRegistrationConfirm')
const OrderCheckout = () => import('@/components/Cart/vOrderCheckout')

Vue.use(VueRouter)

const routes = [

  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'Blog', component: Posts },
  { path: '/products/', name: 'Products', component: Products },
  { path: '/products/:id', name: 'Product', component: ProductCard, props: true },
  { path: '/blog/:id', name: 'Post', component: Post, props: true },
  { path: '/favorite/', name: 'Favorite', component: FavoriteList },
  { path: '/favorite/:id', name: 'FavoriteItem', component: FavoriteItem },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/registration', name: 'Registration', component: Registration },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/ordercheckout', name: 'OrderCheckout', component: OrderCheckout },
  { path: '/accounts/confirm-email/:token', name: 'RegistrationConfirm', component: RegistrationConform, props: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
