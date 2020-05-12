<template>
  <b-container class="col-2">
    <form class="form-signin">
      <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div>
        <label for="Username" class="sr-only" >Username</label>
        <input id="Username" class="form-control"
               :class="[{'is-invalid': $v.username.$error}, {'is-valid': !$v.username.$error}]"
               placeholder="Username" autofocus
               @input="setUsername($event.target.value)">
        <div class="invalid-feedback" v-if="!$v.username.minLength || !$v.username.maxLength">
          Имя пользователя должно содержать минимум {{$v.username.$params.minLength.min}}
          знака и максимум {{$v.username.$params.maxLength.max}}
        </div>
        <div class="invalid-feedback" v-if="!$v.username.required">
          Обязательное поле
        </div>
      </div>
      <div>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password"
               id="inputPassword"
               class="form-control mt-2"
               :class="[{'is-invalid': $v.password.$error}, {'is-valid': !$v.password.$error}]"
               placeholder="Password"
               @input="setPassword($event.target.value)">
        <div class="invalid-feedback" v-if="!$v.password.minLength || !$v.password.maxLength">
          Пароль должен содержать минимум {{$v.password.$params.minLength.min}}
          знака и максимум {{$v.password.$params.maxLength.max}}
        </div>
        <div class="invalid-feedback" v-if="!$v.password.required">
          Обязательное поле
        </div>
      </div>
      <button class="btn btn-lg btn-primary btn-block mt-2" type="submit" @click.prevent="login">Sign in</button>
    </form>
    <div v-if="errors">
      <p style="color: red" v-for="(error, key) in errors" :key="key">{{error[0]}}</p>
    </div>
  </b-container>
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
      minLength: minLength(6),
      maxLength: maxLength(16)
    },
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16)
    }
  },
  methods: {
    ...mapActions([
      'AUTH'
    ]),
    setPassword (value) {
      this.password = value
    },
    setUsername (value) {
      this.username = value
    },
    login () {
      this.$v.password.$touch()
      this.$v.username.$touch()
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
