<template lang="pug">
  .container
    div(v-if='!isSuccess')
      .py-5.text-center
        img.d-block.mx-auto.mb-4(src='/docs/4.4/assets/brand/bootstrap-solid.svg', alt='', width='72', height='72')
        h2 Оформление заказа
        p.lead После оформления заказа с вами свяжутся наши менеджеры для уточнения информации.
      .row
        .col-md-4.order-md-2.mb-4
          h4.d-flex.justify-content-between.align-items-center.mb-3
            span.text-muted Ваша корзина
            span.badge.badge-secondary.badge-pill {{ cartList.length }}
          ul.list-group.mb-3
            li.list-group-item.d-flex.justify-content-between.lh-condensed(v-for='item in cartList', :key='item.id')
              div
                h6.my-0 {{item.good.name}}
                small.text-muted {{item.good.short_text}}
              span.text-muted {{item.amount}}
            li.list-group-item.d-flex.justify-content-between.bg-light(v-if='promoCodeInfo')
              .text-success
                h6.my-0 Promo code
                small {{promoCodeInfo.name}}
              span.text-success -{{promoCodeInfo.discount_value}}$
            li.list-group-item.d-flex.justify-content-between(v-if='promoCodeInfo')
              span Итог
              strong {{GET_PROMO_PRICE}}
            li.list-group-item.d-flex.justify-content-between(v-else='')
              span Итог
              strong {{totalPrice}}
        .col-md-8.order-md-1
          h4.mb-3 Оформление доставки
          form.form-signin
            .row
              .col-md-6.mb-3
                label(for='firstName') Имя
                input#firstName.form-control(type='text', :class="{'is-invalid': $v.firstName.$error}",
                                             :value='firstName', @blur='setFirstName($event.target.value)')
                .invalid-feedback(v-if='!$v.firstName.minLength || !$v.firstName.maxLength && $v.$dirty')
                  | Имя должно содержать минимум {{$v.firstName.$params.minLength.min}}
                  | знака и максимум {{$v.firstName.$params.maxLength.max}}
                .invalid-feedback(v-if='!$v.firstName.required && $v.$dirty')
                  | Обязательное поле
              .col-md-6.mb-3
                label(for='lastName') Фамилия
                input#lastName.form-control(type='text', :class="{'is-invalid': $v.lastName.$error}",
                                                         :value='lastName', @blur='setLastName($event.target.value)')
                .invalid-feedback(v-if='!$v.lastName.minLength || !$v.lastName.maxLength && $v.$dirty')
                  | Фамилия должна содержать минимум {{$v.lastName.$params.minLength.min}}
                  | знака и максимум {{$v.lastName.$params.maxLength.max}}
                .invalid-feedback(v-if='!$v.lastName.required && $v.$dirty')
                  | Обязательное поле
            .mb-3
              label(for='email')
                | Электронный адрес
                span.text-muted (Необязательно)
              input#email.form-control(type='email', :class="{'is-invalid': $v.email.$error}",
                                                     placeholder='you@example.com',
                                                     :value='email', @blur='setEmailName($event.target.value)')
              .invalid-feedback(v-if='!$v.email.minLength || !$v.email.maxLength && $v.$dirty')
                | Электронный адрес должен содержать минимум {{$v.email.$params.minLength.min}}
                | знака и максимум {{$v.email.$params.maxLength.max}}
            .mb-3
              label(for='address') Адрес
              input#address.form-control(type='text', :class="{'is-invalid': $v.address.$error}",
                                                      :value='address', @blur='setAddress($event.target.value)')
              .invalid-feedback(v-if='!$v.address.minLength || !$v.address.maxLength && $v.$dirty')
                | Адрес должен содержать минимум {{$v.address.$params.minLength.min}}
                | знака и максимум {{$v.address.$params.maxLength.max}}
              .invalid-feedback(v-if='!$v.address.required && $v.$dirty')
                | Обязательное поле
            hr.mb-4
            .custom-control.custom-checkbox
              input#save-info.custom-control-input(type='checkbox', v-model.trim='isSaveInfo')
              label.custom-control-label(for='save-info') Сохранить информацию для следующих заказов
            hr.mb-4
            div
              .d-block.my-3
                h4.mb-3 Оплата
                .custom-control.custom-radio
                  input#debit.custom-control-input(name='paymentMethod', type='radio', value='1', checked='',
                                                   v-model='paymentMethod')
                  label.custom-control-label(for='debit') Оплата наличными
                .custom-control.custom-radio
                  input#credit.custom-control-input(name='paymentMethod', type='radio', disabled='')
                  label.custom-control-label(for='credit') Кредитная карта
            hr.mb-4
            button.btn.btn-primary.btn-lg.btn-block(type='submit', @click.prevent='confirm') Оформить
    .lead.mt-5(style='color: #82b440', v-else='')
      h2 Оформление заказа
      p Заказ успешно оформлен, с вами свяжутся наши специалисты.
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
