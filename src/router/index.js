import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
const Registration = () => import('@/components/User/UserRegistrationPage')
const Posts = () => import('@/components/Blog/BlogPostsPage')
const Products = () => import('@/components/Products/ProductListPage')
const Post = () => import('@/components/Blog/BlogPostPage')
const FavoriteList = () => import('@/components/Favorite/FavoriteListPage')
const ProductCard = () => import('@/components/Products/ProductCardPage')
const Auth = () => import('@/components/User/UserAuthPage')
const Cart = () => import('@/components/Cart/CartPage')
const Home = () => import('@/components/Home/HomePage')
const RegistrationConform = () => import('@/components/User/UserRegistrationConfirmPage')
const Orders = () => import('@/components/Orders/OrdersListPage')
const OrderCheckout = () => import('@/components/Cart/OrderCheckoutPage')
const UserRecoveryPassword = () => import('@/components/User/UserRecoveryPasswordPage')
const UserProfilePage = () => import('@/components/User/UserProfilePage')

Vue.use(VueRouter)

const routes = [

  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'Blog', component: Posts },
  { path: '/products/', name: 'Products', component: Products },
  { path: '/products/:id', name: 'Product', component: ProductCard, props: true },
  { path: '/blog/:id', name: 'Post', component: Post, props: true },
  {
    path: '/favorite/',
    name: 'Favorite',
    component: FavoriteList,
    beforeEnter: (from, to, next) => {
      if (store.getters['user/IS_AUTH_TOKEN']) next()
      else next('/login')
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: (from, to, next) => {
      if (!store.getters['user/IS_AUTH_TOKEN']) next()
      else { next('/') }
    }
  },
  { path: '/registration', name: 'Registration', component: Registration },
  { path: '/cart', name: 'Cart', component: Cart },
  {
    path: '/ordercheckout',
    name: 'OrderCheckout',
    component: OrderCheckout,
    beforeEnter: (from, to, next) => {
      if (store.getters['cart/GET_CART_LENGTH'] > 0) next()
      else next('/')
    }
  },
  { path: '/password-reset', name: 'UserRecoveryPassword', component: UserRecoveryPassword },
  { path: '/accounts/confirm-email/:token', name: 'RegistrationConfirm', component: RegistrationConform, props: true },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfilePage,
    beforeEnter: (from, to, next) => {
      if (store.getters['user/IS_AUTH_TOKEN']) next()
      else next('/')
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoriteList,
    beforeEnter: (from, to, next) => {
      if (store.getters['user/IS_AUTH_TOKEN']) next()
      else next('/')
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: (from, to, next) => {
      if (store.getters['user/IS_AUTH_TOKEN']) next()
      else next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
