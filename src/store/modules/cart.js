import {
  orderConfirm,
  sendPromo,
  addToCart,
  deleteFromCart,
  productQuantity,
  getCart
} from '@/services/entities/cart'

export default {
  namespaced: true,
  state: {
    cartId: '',
    totalPrice: 0,
    promoPrice: 0,
    step: 1,
    promoCodeInfo: [],
    cartList: []
  },
  mutations: {
    SET_CART_PRODUCT_LIST (state, payload) {
      state.cartList = payload
    },
    CART_LIST_CLEAR (state, payload) {
      state.cartList = payload
    },
    SET_CART_PRICE (state, payload) {
      state.totalPrice = payload
    },
    SET_PROMO_PRICE (state, payload) {
      state.promoPrice = payload
    },
    SET_PROMO_CODE_INFO (state, payload) {
      state.promoCodeInfo = payload
    }
  },
  getters: {
    GET_PROMO_PRICE (state) {
      if (state.promoPrice !== null) {
        return state.promoPrice
      } else {
        return false
      }
    },
    GET_CART_LENGTH (state) {
      return state.cartList.length
    }
  },
  actions: {
    async ORDER_CONFIRM ({ commit }, { firstName, lastName, email, address, isSaveInfo }) {
      try {
        await orderConfirm({
          receiver_surname: lastName,
          receiver_name: firstName,
          receiver_mail: email,
          delivery_address: address,
          is_save_info: isSaveInfo
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async SEND_PROMO (ctx, promoCode) {
      try {
        return await sendPromo({ promo_code: promoCode })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async ADD_TO_CART ({ getters }, productId) {
      try {
        await addToCart({
          good: productId,
          cart: getters.getCartId,
          quantity: 1
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async DELETE_FROM_CART (ctx, productId) {
      try {
        deleteFromCart(productId)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async CART_ELEMENT_PLUS ({ dispatch, state }, { productId, quantity }) {
      try {
        const q = quantity + state.step
        await productQuantity({ productId, q })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async CART_ELEMENT_MINUS ({ dispatch, state }, { productId, quantity }) {
      try {
        const q = quantity - state.step
        await productQuantity({ productId, q })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async GET_CART_LIST_FROM_API ({ commit }) {
      try {
        const cart = await getCart()
        commit('SET_PROMO_CODE_INFO', cart[0].promo_code)
        commit('SET_PROMO_PRICE', cart[0].promo_price)
        commit('SET_CART_PRICE', cart[0].amount_items)
        commit('SET_CART_PRODUCT_LIST', cart[0].goods)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async CART_LIST_CLEAR ({ commit }) {
      commit('CART_LIST_CLEAR', [])
    }
  }
}
