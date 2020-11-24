<template>
  <div class="container">
    <div class="card shopping-cart" v-if="cartList.length">
      <div class="card-body">
        <v-cart-item class="mb-4" v-for="item in cartList" :item="item" :key="item.id" @delete="deleteFromCart" @plus="plus" @minus="minus" @changequantity="changeQuantity">
          <hr/>
        </v-cart-item>
      </div>
      <div class="card-footer">
        <div class="form-group pull-left">
          <form><input class="form-control" @input="setPromo($event.target.value)" :class="[{'is-invalid': $v.promoText.$error}]" :value="promoText" />
            <div class="invalid-feedback" v-if="!$v.promoText.minLength || !$v.promoText.maxLength">Промокод должен содержать минимум {{$v.promoText.$params.minLength.min}} знака и максимум {{$v.promoText.$params.maxLength.max}}</div><small class="form-text text-muted" id="emailHelp">Введите промокод</small><input class="btn btn-outline-info"
                                                                                                                                                                                                                                                                                                                            type="submit" @click.prevent="sendPromo" /></form>
        </div>
        <div class="pull-right" style="margin: 10px"><button class="btn btn-success pull-right btn-order"><router-link to="/ordercheckout">Оформить заказ</router-link></button>
          <div class="pull-right" v-if="GET_PROMO_PRICE" style="margin: 5px; color: green">Активирован промокод<b>{{promoCodeInfo.description}} (-{{promoCodeInfo.discount_value}}$)</b>Итоговая цена:<b style="text-decoration: line-through"></b><b>{{GET_PROMO_PRICE}}</b></div>
          <div class="pull-right" v-else style="margin: 5px">Total price:<b>{{totalPrice}}</b></div>
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <h2>Пустая корзина</h2>
    </div>
  </div>
</template>

<script>
import vCartItem from './vCartItem'
import { mapGetters, mapActions, mapState } from 'vuex'
import { minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'Cart',
  data () {
    return {
      promoText: ''
    }
  },
  validations: {
    promoText: {
      minLength: minLength(2),
      maxLength: maxLength(10)
    }
  },
  components: {
    vCartItem
  },
  computed: {
    ...mapGetters('cart', [
      'GET_PROMO_PRICE'
    ]),
    ...mapState('cart', [
      'cartList',
      'totalPrice',
      'promoCodeInfo'
    ])
  },
  methods: {
    ...mapActions('cart', [
      'DELETE_FROM_CART',
      'CART_ELEMENT_PLUS',
      'CART_ELEMENT_MINUS',
      'SEND_PROMO',
      'GET_CART_LIST_FROM_API'
    ]),
    setPromo (value) {
      this.promoText = value
    },
    sendPromo () {
      this.$v.promoText.$touch()
      if (!this.$v.$error && this.promoText) {
        this.SEND_PROMO(this.promoText).then(() => {
          this.GET_CART_LIST_FROM_API()
        })
      }
    },
    plus (productId, quantity) {
      this.CART_ELEMENT_PLUS({
        productId,
        quantity
      })
    },
    minus (productId, quantity) {
      this.CART_ELEMENT_MINUS({
        productId,
        quantity
      })
    },
    deleteFromCart (id) {
      this.DELETE_FROM_CART({ productId: id })
    },
    changeQuantity (productId, quantity) {
      this.CART_ELEMENT_CHANGE_COUNT({
        productId,
        quantity
      })
    }
  }
}
</script>

<style scoped>
  .btn-order a {
    color: white;
    text-decoration: none;
  }
  .quantity input {
    margin: 0;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    float: right;
    color: #000;
    font-size: 20px;
    border: 0;
    outline: 0;
    background-color: #F6F6F6
  }

  .quantity input.qty {
    position: relative;
    border: 0;
    width: 100%;
    height: 40px;
    padding: 10px 25px 10px 10px;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
    border-radius: 0;
    background-clip: padding-box
  }

  .quantity .minus, .quantity .plus {
    line-height: 0;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -webkit-background-size: 6px 30px;
    -moz-background-size: 6px 30px;
    color: #bbb;
    font-size: 20px;
    position: absolute;
    height: 50%;
    border: 0;
    right: 0;
    padding: 0;
    width: 25px;
    z-index: 3
  }

  .quantity .minus:hover, .quantity .plus:hover {
    background-color: #dad8da
  }

  .quantity .minus {
    bottom: 0
  }
  .shopping-cart {
    margin-top: 20px;
  }
</style>
