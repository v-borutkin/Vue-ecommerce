<template lang="pug">
  b-container(style='display: flex;justify-content: center; align-content: center;')
  form.form-signin.col-6
    h1.h3.mb-3.font-weight-normal Регистрация
    div
      label(for='username') Ваше имя
      input#username.form-control(type='text', ref='username', :class="{'is-invalid': $v.username.$error}", placeholder='Username', v-model='username')
      .invalid-feedback(v-if='!$v.username.minLength || !$v.username.maxLength')
        | Имя пользователя должно содержать минимум {{$v.username.$params.minLength.min}}
        | знака и максимум {{$v.username.$params.maxLength.max}}
      .invalid-feedback(v-if='!$v.username.required')
        | Обязательное поле
    .mt-2
      label(for='inputEmail') Электронная почта
      input#inputEmail.form-control(type='text', ref='email', :class="{'is-invalid': $v.email.$error}", placeholder='Email address', v-model='email')
      .invalid-feedback(v-if='!$v.email.required')
        | Обязательное поле
      .invalid-feedback(v-if='!$v.email.email')
        |  Введите корректный электронный адрес
    .mt-2(ref='password1')
      label(for='inputPassword') Пароль
      input#inputPassword.form-control(type='password', placeholder='Password', :class="{'is-invalid': $v.password.$error}", v-model='password')
      .invalid-feedback(v-if='!$v.password.minLength || !$v.password.maxLength')
        | Пароль должен содержать минимум {{$v.password.$params.minLength.min}}
        | знака и максимум {{$v.password.$params.maxLength.max}}
      .invalid-feedback(v-if='!$v.password.required')
        | Обязательное поле
    .mt-2(ref='password2')
      label(for='inputPasswordConfirm') Подтвердите пароль
      input#inputPasswordConfirm.form-control(type='password', placeholder='Password', :class="{'is-invalid': $v.passwordConfirm.$error}", v-model='passwordConfirm')
      .invalid-feedback(v-if='!$v.passwordConfirm.required')
        | Обязательное поле
      .invalid-feedback(v-if='!$v.passwordConfirm.sameAs')
        | Пароли не совпадают
    button.btn.btn-lg.btn-primary.mt-2(type='submit', @click.prevent='registration') Регистрация
    p.mt-5.mb-3.text-muted 2020
</template>

<script>
import { minLength, maxLength, required, email, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'Registration',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  validations: {
    email: {
      email,
      required
    },
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16)
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(16)
    },
    passwordConfirm: {
      required,
      sameAs: sameAs('password')
    }
  },
  methods: {
    ...mapActions('user', [
      'REGISTRATION'
    ]),
    registration: function () {
      this.$v.$touch()
      if (document.querySelectorAll('.error-api')) {
        document.querySelectorAll('.error-api').forEach(e => e.parentNode.removeChild(e))
      }

      if (!this.$v.$error) {
        this.REGISTRATION({
          username: this.username,
          email: this.email,
          password1: this.password,
          password2: this.passwordConfirm
        }).then(response => {
          if (response.status === 201) {
            alert('Вы успешно зарегистрировались, вам придет письмо с дальнейшими инструкциями')
          }
        }).catch(error => { // TODO зафиксить, перенести в vuex
          for (const item in error.response.data) {
            this.$refs[item].classList.add('is-invalid')
            this.$refs[item].insertAdjacentHTML('afterEnd',
              `<p class="error-api">${error.response.data[item][0]}</p>`)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
