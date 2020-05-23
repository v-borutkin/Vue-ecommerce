<template lang="pug">
  b-container.col-2
    form.form-signin
      img.mb-4(src='/docs/4.4/assets/brand/bootstrap-solid.svg', alt='', width='72', height='72')
      h1.h3.mb-3.font-weight-normal Войдите
      div
        label.sr-only(for='Username') Логин
        input#Username.form-control(:class="[{'is-invalid': $v.username.$error}, {'is-valid': !$v.username.$error}]", placeholder='Username', autofocus='', @input='setUsername($event.target.value)')
        .invalid-feedback(v-if='!$v.username.minLength || !$v.username.maxLength')
          | Логин должен содержать минимум{{$v.username.$params.minLength.min}}
          | знака и максимум {{$v.username.$params.maxLength.max}}
        .invalid-feedback(v-if='!$v.username.required')
          | Обязательное поле
      div
        label.sr-only(for='inputPassword') Password
        input#inputPassword.form-control.mt-2(type='password', :class="[{'is-invalid': $v.password.$error}, {'is-valid': !$v.password.$error}]", placeholder='Password', @input='setPassword($event.target.value)')
        .invalid-feedback(v-if='!$v.password.minLength || !$v.password.maxLength')
          | Пароль должен содержать минимум {{$v.password.$params.minLength.min}}
          | знака и максимум {{$v.password.$params.maxLength.max}}
        .invalid-feedback(v-if='!$v.password.required')
          |  Обязательное поле
      button.btn.btn-lg.btn-primary.btn-block.mt-2(type='submit', @click.prevent='login') Войти
    .mt-3
      router-link(to='/registration') нет аккаунта
      router-link.ml-2(to='/password-reset') не помню пароль
    div(v-if='errors')
      p(style='color: red', v-for='(error, key) in errors', :key='key') {{error[0]}}

</template>

<script>
import { mapActions } from 'vuex'
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
export default {
  name: 'Auth',
  data () {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(16)
    },
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16)
    }
  },
  methods: {
    ...mapActions('user', [
      'AUTH'
    ]),
    setPassword (value) {
      this.password = value
    },
    setUsername (value) {
      this.username = value
    },
    login () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.AUTH({
          username: this.username,
          password: this.password
        }).catch(error => {
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
