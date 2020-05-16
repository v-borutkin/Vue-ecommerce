import Vue from 'vue'
import VueRouter from 'vue-router'
const Registration = () => import('@/components/User/UserRegistrationPage')
const Posts = () => import('@/components/Blog/BlogPostsPage')
const Products = () => import('@/components/Products/ProductListPage')
const Post = () => import('@/components/Blog/BlogPostPage')
const FavoriteList = () => import('@/components/Favorite/FavoriteListPage')
const FavoriteItem = () => import('@/components/Favorite/FavoriteCardPage')
const ProductCard = () => import('@/components/Products/ProductCardPage')
const Auth = () => import('@/components/User/UserAuthPage')
const Cart = () => import('@/components/Cart/CartPage')
const Home = () => import('@/components/Home/HomePage')
const RegistrationConform = () => import('@/components/User/UserRegistrationConfirmPage')
const OrderCheckout = () => import('@/components/Cart/OrderCheckoutPage')

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
