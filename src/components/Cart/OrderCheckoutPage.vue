<template>
  <div class="container">
    <div v-if="!isSuccess">
      <div class="py-5 text-center"><img class="d-block mx-auto mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h2>Оформление заказа</h2>
        <p class="lead">После оформления заказа с вами свяжутся наши менеджеры для уточнения информации.</p>
      </div>
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3"><span class="text-muted">Ваша корзина</span><span class="badge badge-secondary badge-pill">{{ cartList.length }}</span></h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed" v-for="item in cartList" :key="item.id">
              <div>
                <h6 class="my-0">{{item.good.name}}</h6><small class="text-muted">{{item.good.short_text}}</small></div><span class="text-muted">{{item.amount}}</span></li>
            <li class="list-group-item d-flex justify-content-between bg-light" v-if="promoCodeInfo">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6><small>{{promoCodeInfo.name}}</small></div><span class="text-success">-{{promoCodeInfo.discount_value}}$</span></li>
            <li class="list-group-item d-flex justify-content-between" v-if="promoCodeInfo"><span>Итог</span><strong>{{GET_PROMO_PRICE}}</strong></li>
            <li class="list-group-item d-flex justify-content-between" v-else=""><span>Итог</span><strong>{{totalPrice}}</strong></li>
          </ul>
        </div>
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Оформление доставки</h4>
          <form class="form-signin">
            <div class="row">
              <div class="col-md-6 mb-3"><label for="firstName">Имя</label><input class="form-control" id="firstName" type="text" :class="{'is-invalid': $v.firstName.$error}" :value="firstName" @blur="setFirstName($event.target.value)" />
                <div class="invalid-feedback"
                     v-if="!$v.firstName.minLength || !$v.firstName.maxLength &amp;&amp; $v.$dirty">Имя должно содержать минимум {{$v.firstName.$params.minLength.min}} знака и максимум {{$v.firstName.$params.maxLength.max}}</div>
                <div class="invalid-feedback" v-if="!$v.firstName.required &amp;&amp; $v.$dirty">Обязательное поле</div>
              </div>
              <div class="col-md-6 mb-3"><label for="lastName">Фамилия</label><input class="form-control" id="lastName" type="text" :class="{'is-invalid': $v.lastName.$error}" :value="lastName" @blur="setLastName($event.target.value)" />
                <div class="invalid-feedback" v-if="!$v.lastName.minLength || !$v.lastName.maxLength &amp;&amp; $v.$dirty">Фамилия должна содержать минимум {{$v.lastName.$params.minLength.min}} знака и максимум {{$v.lastName.$params.maxLength.max}}</div>
                <div class="invalid-feedback" v-if="!$v.lastName.required &amp;&amp; $v.$dirty">Обязательное поле</div>
              </div>
            </div>
            <div class="mb-3"><label for="email">Электронный адрес<span class="text-muted">(Необязательно)</span></label><input class="form-control" id="email" type="email" :class="{'is-invalid': $v.email.$error}" placeholder="you@example.com" :value="email" @blur="setEmailName($event.target.value)"
            />
              <div class="invalid-feedback" v-if="!$v.email.minLength || !$v.email.maxLength &amp;&amp; $v.$dirty">Электронный адрес должен содержать минимум {{$v.email.$params.minLength.min}} знака и максимум {{$v.email.$params.maxLength.max}}</div>
            </div>
            <div class="mb-3"><label for="address">Адрес</label><input class="form-control" id="address" type="text" :class="{'is-invalid': $v.address.$error}" :value="address" @blur="setAddress($event.target.value)" />
              <div class="invalid-feedback" v-if="!$v.address.minLength || !$v.address.maxLength &amp;&amp; $v.$dirty">Адрес должен содержать минимум {{$v.address.$params.minLength.min}} знака и максимум {{$v.address.$params.maxLength.max}}</div>
              <div class="invalid-feedback" v-if="!$v.address.required &amp;&amp; $v.$dirty">Обязательное поле</div>
            </div>
            <hr class="mb-4" />
            <div class="custom-control custom-checkbox"><input class="custom-control-input" id="save-info" type="checkbox" v-model.trim="isSaveInfo" /><label class="custom-control-label" for="save-info">Сохранить информацию для следующих заказов</label></div>
            <hr class="mb-4" />
            <div>
              <div class="d-block my-3">
                <h4 class="mb-3">Оплата</h4>
                <div class="custom-control custom-radio"><input class="custom-control-input" id="debit" name="paymentMethod" type="radio" value="1" checked="" v-model="paymentMethod" /><label class="custom-control-label" for="debit">Оплата наличными</label></div>
                <div class="custom-control custom-radio"><input class="custom-control-input" id="credit" name="paymentMethod" type="radio" disabled="" /><label class="custom-control-label" for="credit">Кредитная карта</label></div>
              </div>
            </div>
            <hr class="mb-4" /><button class="btn btn-primary btn-lg btn-block" type="submit" @click.prevent="confirm">Оформить</button></form>
        </div>
      </div>
    </div>
    <div class="lead mt-5" style="color: #82b440" v-else="">
      <h2>Оформление заказа</h2>
      <p>Заказ успешно оформлен, с вами свяжутся наши специалисты.</p>
    </div>
  </div>
</template>
<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'OrderCheckout',
  data () {
    return {
      lastName: '',
      firstName: '',
      email: '',
      isSaveInfo: false,
      address: '',
      paymentMethod: 1,
      isSuccess: false
    }
  },
  validations: {
    lastName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(24)
    },
    firstName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(24)
    },
    email: {
      email,
      minLength: minLength(4),
      maxLength: maxLength(30)
    },
    address: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(60)
    }
  },
  methods: {
    ...mapActions('cart', [
      'CART_LIST_CLEAR',
      'ORDER_CONFIRM'
    ]),
    setFirstName (value) {
      this.firstName = value
      this.$v.firstName.$touch()
    },
    setLastName (value) {
      this.lastName = value
      this.$v.lastName.$touch()
    },
    setEmailName (value) {
      this.email = value
      this.$v.email.$touch()
    },
    setAddress (value) {
      this.address = value
      this.$v.address.$touch()
    },
    confirm () {
      this.$v.$touch()

      if (!this.$v.$error) {
        this.ORDER_CONFIRM({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          address: this.address,
          isSaveInfo: this.isSaveInfo
        })
          .then(() => {
            this.isSuccess = true
            alert('Заказ оформлен, с вами свяжутся наши менеджеры')
            this.CART_LIST_CLEAR()
          })
          .catch(() => {
            alert('Произошла ошибка, попробуйте позднее')
          })
      }
    }
  },
  computed: {
    ...mapState('cart', [
      'cartList',
      'totalPrice',
      'promoCodeInfo'
    ]),
    ...mapGetters('cart', [
      'GET_PROMO_PRICE'
    ])
  }
}
</script>

<style scoped>
  .invalid-feedback {
    display: block;
  }
</style>
