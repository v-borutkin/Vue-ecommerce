<template lang="pug">
  b-container.col-4
    transition(name='fade', mode='out-in')
      form.form-signin(v-if='!isSuccess')
        img.mb-4(src='/docs/4.4/assets/brand/bootstrap-solid.svg', alt='', width='72', height='72')
        h1.h3.mb-3.font-weight-normal Введите электронную почту для восстановления пароля
        div
          input#email.form-control(:class="[{'is-invalid': $v.email.$error}, {'is-valid': !$v.email.$error}]", placeholder='Email', autofocus='', @input='setEmail($event.target.value)')
          .invalid-feedback(v-if='!$v.email.email')
            | Укажите корректный емаил адрес
          .invalid-feedback(v-if='!$v.email.required')
            | Обязательное поле
        button.btn.btn-lg.btn-primary.btn-block.mt-2.col-4(type='submit', @click.prevent='recovery') Восстановить
      h2.mt-5(v-else='', style='color: #82b440') Письмо с дальнейшими инструкциями отправлены на почту
    .mt-3(v-if='errors')
      p(style='color: red', v-for='(error, key) in errors', :key='key') {{error[0]}}

</template>

<script>
import { mapActions } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
export default {
  name: 'Auth',
  data () {
    return {
      email: '',
      isSuccess: false,
      errors: []
    }
  },
  validations: {
    email: {
      required,
      email
    }

  },
  methods: {
    ...mapActions('user', [
      'RECOVERY_PASSWORD'
    ]),
    setEmail (value) {
      this.email = value
    },
    recovery () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.RECOVERY_PASSWORD(this.email)
          .then(() => {
            this.isSuccess = true
          })
          .catch(error => {
            this.errors = error.response.data
          })
      }
    }
  }
}
</script>

<style scoped>
  .form-signin {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
</style>
