<template>
  <b-container class="col-4">
    <form class="form-signin">
      <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Введите электронную почту для восстановления пароля</h1>
      <div>
        <input id="email" class="form-control"
               :class="[{'is-invalid': $v.email.$error}, {'is-valid': !$v.email.$error}]"
               placeholder="Email" autofocus
               @input="setEmail($event.target.value)">
        <div class="invalid-feedback" v-if="!$v.email.email">
          Укажите корректный емаил адрес
        </div>
        <div class="invalid-feedback" v-if="!$v.email.required">
          Обязательное поле
        </div>
      </div>
      <button class="btn btn-lg btn-primary btn-block mt-2 col-4" type="submit" @click.prevent="recovery">Восстановить</button>
    </form>
    <div v-if="errors">
      <p style="color: red" v-for="(error, key) in errors" :key="key">{{error[0]}}</p>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
export default {
  name: 'Auth',
  data () {
    return {
      email: ''
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
        this.RECOVERY_PASSWORD({
          email: this.email
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
