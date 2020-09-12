import Vue from 'vue'
import Toasted from 'vue-toasted'

import '../css/toast.scss'

Vue.use(Toasted, {
  position: 'top-center',
  duration: 5000,
  theme: 'gt-toast',
  className: '',
  containerClass: 'gl-toast-container'
})
