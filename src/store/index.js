import Vue from 'vue'
import Vuex from 'vuex'

import navigation from '@/store/modules/navigation'
import slider from '@/store/modules/slider'
import user from '@/store/modules/user'
import blog from '@/store/modules/blog'
import shared from '@/store/modules/shared'
import favorite from '@/store/modules/favorite'
import products from '@/store/modules/products'
import comments from '@/store/modules/comments'
import cart from '@/store/modules/cart'
import categories from '@/store/modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigation,
    slider,
    user,
    blog,
    shared,
    favorite,
    products,
    comments,
    cart,
    categories
  }
})
