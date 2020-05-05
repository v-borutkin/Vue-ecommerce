<template>
  <div class="container">
    <div v-if="GET_CART_LIST.length" class="card shopping-cart">
      <div class="card-body">

        <cart-item v-for="item in GET_CART_LIST"
                   :item="item"
                   :key="item.id"
                   v-on:delete="deleteFromCart"
                   v-on:plus="plus"
                   v-on:minus="minus"
                   v-on:changeQuantity="changeQuantity"/>
        <hr>
      </div>
      <div class="card-footer">
        <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
          <div class="row">
            <div class="col-6">
              <input type="text" class="form-control" placeholder="cupone code" v-model="promoText">
            </div>
            <div class="col-6">
              <input type="submit" class="btn btn-info" value="Use cupone" @click="sendPromo">
            </div>
          </div>
        </div>
        <div class="pull-right" style="margin: 10px">
          <button class="btn btn-success pull-right" @click="orderCheckout">Оформить заказ</button>
          <div v-if="GET_PROMO.promo_code" class="pull-right" style="margin: 5px;">
            <p style="color: green">Активирован промо код <b>{{GET_PROMO.promo_code.description}}</b>
              на сумму {{GET_PROMO.promo_code.discount_value}}</p>
            Total price: <b>{{GET_PROMO.promo_price}}</b>
          </div>
          <div v-else class="pull-right" style="margin: 5px">
            Total price: <b>{{GET_TOTAL_PRICE}}</b>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card">
      <h2>Пустая корзина</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartItem from './CartItem'
export default {
  name: 'Cart',
  data () {
    return {
      promoText: ''
    }
  },
  components: {
    CartItem
  },
  computed: {
    ...mapGetters([
      'GET_CART_LIST',
      'GET_TOTAL_PRICE',
      'GET_PROMO'
    ])
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'CART_ELEMENT_PLUS',
      'CART_ELEMENT_MINUS',
      'CART_ELEMENT_CHANGE_COUNT',
      'SEND_PROMO',
      'GET_PROMO_INFO_FROM_API'
    ]),
    sendPromo () {
      this.SEND_PROMO(this.promoText).then(() => {
        this.GET_PROMO_INFO_FROM_API()
      })
    },
    isPromo () {
      if (this.promoText) {
        this.SEND_PROMO(this.promoText).then(() => {
          this.GET_PROMO_INFO_FROM_API()
        })
      }
    },
    orderCheckout () {

    },
    plus (productId, quantity) {
      this.CART_ELEMENT_PLUS({
        productId,
        quantity
      }).then(() => {
        this.isPromo()
      })
    },
    minus (productId, quantity) {
      this.CART_ELEMENT_MINUS({
        productId,
        quantity
      }).then(() => {
        this.isPromo()
      })
    },
    deleteFromCart (id) {
      this.DELETE_FROM_CART(id).then(() => {
        this.isPromo()
      })
    },
    changeQuantity (productId, quantity) {
      this.CART_ELEMENT_CHANGE_COUNT({
        productId,
        quantity
      }).then(() => {
        this.isPromo()
      })
    }
  }
}
</script>

<style scoped>

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
