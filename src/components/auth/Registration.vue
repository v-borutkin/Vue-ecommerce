<template>
  <b-container class="col-8">
    <form class="form-signin">
      <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>
      <div class="d-inline-flex col-12" ref="username">
        <label for="username" class="col-3">Ваше имя</label>
        <input type="text" id="username"
               class="form-control"
               placeholder="Username"
               v-model="username"
        >
      </div>
      <div class="d-inline-flex col-12 mt-2" ref="email">
        <label for="inputEmail" class="col-3">Электронная почта</label>
        <input type="text"
               id="inputEmail"
               class="form-control"
               placeholder="Email address"
               v-model="email"
        >
      </div>
      <div class="d-inline-flex col-12 mt-2">
        <label for="inputPassword" class="col-3">Пароль</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password">
      </div>
      <div class="d-inline-flex col-12 mt-2">
        <label for="inputPasswordConfirm" class="col-3">Подтвердите пароль</label>
        <input type="password" id="inputPasswordConfirm" class="form-control" placeholder="Password" v-model="passwordConfirm">
      </div>
      <button class="btn btn-lg btn-primary mt-2" type="submit" @click.prevent="registration">Регистрация</button>
      <p class="mt-5 mb-3 text-muted">2020</p>
    </form>
    <div v-if="errors">
      <p style="color: red" v-for="(error, key) in errors" :key="key">{{error[0]}}</p>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Registration',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: []
    }
  },
  computed: {
    ...mapGetters([
      'IS_REGISTRATION'
    ])
  },
  methods: {
    ...mapActions([
      'REGISTRATION'
    ]),
    registration () {
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
          this.$refs[item].insertAdjacentHTML('afterend',
            `<p style="color: red">${error.response.data[item][0]}</p>`)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
