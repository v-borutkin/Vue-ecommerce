<template>
<h2 v-if="isRegistration">Вы успешно зарегистрированы, тепреь вы можете авторизоваться</h2>
  <h2 v-else>Что-то пошло не так</h2>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegistrationConfirm',
  props: ['token'],
  data () {
    return {
      isRegistration: false
    }
  },
  methods: {
    ...mapActions('user', [
      'REGISTRATION_CONFIRM'
    ])
  },
  mounted () {
    this.REGISTRATION_CONFIRM(this.token)
      .then(response => {
        if (response.status === 200) {
          this.isRegistration = true
        }
      }).catch(error => {
        if (error.response.status === 404) {
          alert('Произошла ошибка регистрации, попробуйте повторно перейти по ссылке либо связаться с администратором')
        }
      })
  }
}
</script>

<style scoped>

</style>
