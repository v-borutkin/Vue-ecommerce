import Vue from 'vue'
import VueRouter from 'vue-router'
const Registration = () => import('@/components/auth/Registration')
const Posts = () => import('@/components/Blog/Posts')
const Products = () => import('@/components/Products/Products')
const Post = () => import('@/components/Blog/Post')
const FavoriteList = () => import('@/components/Favorite/FavoriteList')
const FavoriteItem = () => import('@/components/Favorite/FavoriteItem')
const ProductCard = () => import('@/components/Products/ProductCard')
const Auth = () => import('@/components/auth/Auth')
const Cart = () => import('@/components/Cart/Cart')
const Home = () => import('@/components/Home/home')
const RegistrationConform = () => import('@/components/auth/RegistrationConfirm')
const OrderCheckout = () => import('@/components/Cart/OrderCheckout')

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
