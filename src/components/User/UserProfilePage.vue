<template>
<b-container>
  <div class="user-info mt-5">
    Ваше имя: {{ user.userName }}
  </div>
  <hr />
  <h3 class="mt-5">Изменить пароль</h3>
  <form class="form-newPassword col-12">
    <div class="col-4">
      <input class="form-control mt-2"
             :class="[{'is-invalid': $v.newPassword.$error}]"
             type="text"
             id="newPassword"
             placeholder="Введите пароль"
             v-model="newPassword">
      <div class="invalid-feedback" v-if="!$v.newPassword.minLength || !$v.newPassword.maxLength">
        Пароль должен содержать минимум {{$v.newPassword.$params.minLength.min}}
        знака и максимум {{$v.newPassword.$params.maxLength.max}}
      </div>
      <div class="invalid-feedback" v-if="!$v.newPassword.required">
        Обязательное поле
      </div>
    </div>
    <div class="col-4">
      <input class="form-control mt-2"
             :class="[{'is-invalid': $v.newPasswordConfirm.$error}]"
             type="text"
             id="newPasswordConfirm"
             placeholder="Повторите пароль"
             v-model="newPasswordConfirm">
      <div class="invalid-feedback" v-if="!$v.newPasswordConfirm.required">
        Обязательное поле
      </div>
      <div class="invalid-feedback" v-if="!$v.newPasswordConfirm.sameAs">
        Пароли не совпадают
      </div>
    </div>
    <button class="btn btn-success mt-2" type="submit" @click.prevent="sendNewPassword">Изменить пароль</button>

    <div v-if="errors" class="mt-4 error-api">
      <p style="color: red" v-for="(error, key) in errors" :key="key">{{error[0]}}</p>
    </div>
  </form>
</b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { minLength, maxLength, required, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'UserOrdersPage',
  data () {
    return {
      newPassword: '',
      newPasswordConfirm: '',
      errors: []
    }
  },
  computed: {
    ...mapState('user', [
      'user'
    ])
  },
  methods: {
    ...mapActions('user', [
      'SEND_NEW_PASSWORD'
    ]),
    sendNewPassword () {
      this.$v.newPassword.$touch()
      this.$v.newPasswordConfirm.$touch()

      if (!this.$v.$error) {
        this.SEND_NEW_PASSWORD({
          newPassword: this.newPassword,
          newPasswordConfirm: this.newPasswordConfirm
        })
          .then(() => {
            this.newPassword = ''
            this.newPasswordConfirm = ''
            alert('Пароль успешно изменен')
          })
          .catch(error => {
            this.errors = error.response.data
          })
      }
    }
  },
  validations: {
    newPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(16)
    },
    newPasswordConfirm: {
      required,
      sameAs: sameAs('newPassword')
    }
  }
}
</script>

<style scoped>
  .form-newPassword {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
</style>
