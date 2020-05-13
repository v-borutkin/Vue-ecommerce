<template>
  <div class="container">
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h2>Оформление заказа</h2>
      <p class="lead">После оформления заказа с вами свяжутся наши менеджеры для уточнения информации.</p>
    </div>

    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Ваша корзина</span>
          <span class="badge badge-secondary badge-pill">{{ GET_CART_LIST.length }}</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-condensed"
              v-for="item in GET_CART_LIST"
              :key="item.id">
            <div>
              <h6 class="my-0">{{item.good.name}}</h6>
              <small class="text-muted">{{item.good.short_text}}</small>
            </div>
            <span class="text-muted">{{item.amount}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light" v-if="GET_PROMO_CODE_INFO">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>{{GET_PROMO_CODE_INFO.name}}</small>
            </div>
            <span class="text-success">-{{GET_PROMO_CODE_INFO.discount_value}}$</span>
          </li>
          <li class="list-group-item d-flex justify-content-between" v-if="GET_PROMO_CODE_INFO">
            <span>Итог</span>
            <strong>{{GET_PROMO_PRICE}}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between" v-else>
            <span>Итог</span>
            <strong>{{GET_TOTAL_PRICE}}</strong>
          </li>

        </ul>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Оформление доставки</h4>
        <form class="needs-validation">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Имя</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Фамилия</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Электронный адрес <span class="text-muted">(Необязательно)</span></label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com">
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div class="mb-3">
            <label for="address">Адрес доставки</label>
            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>
          <hr class="mb-4">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="save-info">
            <label class="custom-control-label" for="save-info">Сохранить информацию для следующих заказов</label>
          </div>
          <hr class="mb-4">
          <div>
            <div class="d-block my-3">
              <h4 class="mb-3">Оплата</h4>
              <div class="custom-control custom-radio">
                <input id="debit"
                       name="paymentMethod"
                       type="radio"
                       class="custom-control-input"
                       value="1"
                       checked
                       v-model="paymentMethod">
                <label class="custom-control-label" for="debit">Оплата наличными</label>
              </div>
              <div class="custom-control custom-radio">
                <input id="credit"
                       name="paymentMethod"
                       type="radio"
                       class="custom-control-input"
                       disabled>
                <label class="custom-control-label" for="credit">Кредитная карта</label>
              </div>
            </div>
          </div>
          <hr class="mb-4">
          <button class="btn btn-primary btn-lg btn-block" type="submit">Оформить</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OrderCheckout',
  data () {
    return {
      paymentMethod: 1,
      address: ''
    }
  },

  computed: {
    ...mapGetters([
      'GET_CART_LIST',
      'GET_TOTAL_PRICE',
      'GET_PROMO_PRICE',
      'GET_PROMO_CODE_INFO'
    ])
  },
  mounted () {

  }
}
</script>

<style>

</style>
