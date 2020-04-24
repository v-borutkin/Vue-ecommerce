<template>
  <b-container class="col-2">
    <form class="form-signin">
      <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>
      <div>
        <label for="username" class="sr-only" >Ваше имя</label>
        <input type="text" id="username" class="form-control" placeholder="Username" required autofocus>
      </div>
      <div>
        <label for="inputEmail" class="sr-only" >Email address</label>
        <input type="text" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      </div>
      <div>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      </div>
      <div>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </b-container>
</template>

<script>
export default {
  name: 'Registration'
}
</script>

<style scoped>

</style>
