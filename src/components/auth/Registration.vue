<template>
  <b-container style="display: flex;justify-content: center; align-content: center;">
    <form class="form-signin col-6">
      <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>

      <div>
        <label for="username">Ваше имя</label>
        <input type="text" id="username"
               ref="username"
               class="form-control"
               :class="{'is-invalid': $v.username.$error}"
               placeholder="Username"
               v-model="username">
        <div class="invalid-feedback" v-if="!$v.username.minLength || !$v.username.maxLength">
          Имя пользователя должно содержать минимум {{$v.username.$params.minLength.min}}
          знака и максимум {{$v.username.$params.maxLength.max}}
        </div>
        <div class="invalid-feedback" v-if="!$v.username.required">
          Обязательное поле
        </div>
      </div>
      <div class="mt-2" >
        <label for="inputEmail">Электронная почта</label>
        <input type="text"
               id="inputEmail"
               class="form-control"
               ref="email"
               :class="{'is-invalid': $v.email.$error}"
               placeholder="Email address"
               v-model="email">
        <div class="invalid-feedback" v-if="!$v.email.required">
          Обязательное поле
        </div>
        <div class="invalid-feedback" v-if="!$v.email.email">
          Введите корректный электронный адрес
        </div>
      </div>
      <div class="mt-2" ref="password1">
        <label for="inputPassword">Пароль</label>
        <input type="password"
               id="inputPassword"
               class="form-control"
               placeholder="Password"
               :class="{'is-invalid': $v.password.$error}"
               v-model="password">
        <div class="invalid-feedback" v-if="!$v.password.minLength || !$v.password.maxLength">
        Пароль должен содержать минимум {{$v.password.$params.minLength.min}}
        знака и максимум {{$v.password.$params.maxLength.max}}
      </div>
        <div class="invalid-feedback" v-if="!$v.password.required">
          Обязательное поле
        </div>
      </div>
      <div class="mt-2" ref="password2">
        <label for="inputPasswordConfirm">Подтвердите пароль</label>
        <input type="password"
               id="inputPasswordConfirm"
               class="form-control"
               placeholder="Password"
               :class="{'is-invalid': $v.passwordConfirm.$error}"
               v-model="passwordConfirm">

        <div class="invalid-feedback" v-if="!$v.passwordConfirm.required">
          Обязательное поле
        </div>
        <div class="invalid-feedback" v-if="!$v.passwordConfirm.sameAs">
          Пароли не совпадают
        </div>
      </div>
      <button class="btn btn-lg btn-primary mt-2" type="submit" @click.prevent="registration">Регистрация</button>
      <p class="mt-5 mb-3 text-muted">2020</p>
    </form>
  </b-container>
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
    ...mapActions([
      'REGISTRATION'
    ]),
    registration () {
      this.$v.password.$touch()
      this.$v.email.$touch()
      this.$v.passwordConfirm.$touch()
      this.$v.username.$touch()
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
              `<p style="color: #dc3545; font-size: 80%; margin-top: .25rem;" class="error-api">${error.response.data[item][0]}</p>`)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
