import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { initAPIClient } from './services/APIClient'
import './plugins'

Vue.use(Vuelidate)
Vue.config.productionTip = false
initAPIClient(store)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

store.$app = app
