<template>
  <b-container class="col-2">
    <form class="form-signin">
      <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div>
        <label for="inputEmail" class="sr-only" >Email address</label>
        <input type="text"
               id="inputEmail" class="form-control"
               placeholder="Email address" autofocus
               v-model.trim="$v.username.$model">
      </div>
      <div>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password"
               id="inputPassword"
               class="form-control"
               placeholder="Password"
               v-model.trim="$v.password.$model">
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login">Sign in</button>
      <pre>{{ $v }}</pre>
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
      minLength: minLength(4),
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
    login () {
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
