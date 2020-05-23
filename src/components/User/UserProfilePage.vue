<template lang="pug">
  b-container
    .user-info.mt-5
      | Ваше имя: {{ user.userName }}
    hr
    h3.mt-5 Изменить пароль
    form.form-newPassword.col-12
      .col-4
        input#newPassword.form-control.mt-2(:class="[{'is-invalid': $v.newPassword.$error}]", type='text', placeholder='Введите пароль', v-model='newPassword')
        .invalid-feedback(v-if='!$v.newPassword.minLength || !$v.newPassword.maxLength')
          | Пароль должен содержать минимум {{$v.newPassword.$params.minLength.min}}
          | знака и максимум {{$v.newPassword.$params.maxLength.max}}
        .invalid-feedback(v-if='!$v.newPassword.required')
          | Обязательное поле
      .col-4
        input#newPasswordConfirm.form-control.mt-2(:class="[{'is-invalid': $v.newPasswordConfirm.$error}]", type='text', placeholder='Повторите пароль', v-model='newPasswordConfirm')
        .invalid-feedback(v-if='!$v.newPasswordConfirm.required')
          | Обязательное поле
        .invalid-feedback(v-if='!$v.newPasswordConfirm.sameAs')
          | Пароли не совпадают
      button.btn.btn-success.mt-2(type='submit', @click.prevent='sendNewPassword') Изменить пароль
      .mt-4.error-api(v-if='errors')
        p(style='color: red', v-for='(error, key) in errors', :key='key') {{error[0]}}

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
