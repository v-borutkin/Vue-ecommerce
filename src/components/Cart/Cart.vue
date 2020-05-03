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
              <input type="text" class="form-control" placeholder="cupone code">
            </div>
            <div class="col-6">
              <input type="submit" class="btn btn-info" value="Use cupone">
            </div>
          </div>
        </div>
        <div class="pull-right" style="margin: 10px">
          <button class="btn btn-success pull-right">Оформить заказ</button>
          <div class="pull-right" style="margin: 5px">
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
  components: {
    CartItem
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'CART_ELEMENT_PLUS',
      'CART_ELEMENT_MINUS',
      'CART_ELEMENT_CHANGE_COUNT'
    ]),
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
      this.DELETE_FROM_CART(id)
    },
    changeQuantity (productId, quantity) {
      this.CART_ELEMENT_CHANGE_COUNT({
        productId,
        quantity
      })
    }
  },
  computed: {
    ...mapGetters([
      'GET_CART_LIST',
      'GET_TOTAL_PRICE'
    ])
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
