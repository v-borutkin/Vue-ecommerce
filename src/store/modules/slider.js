import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    sliderItems: [
      { src: 'https://img1.akspic.ru/image/13872-snajper-oruzhie-soldat-strajkbolnoe_oruzhie-pushka-1920x1080.jpg', alt: 'image slot', text: 'asdsadasd' },
      { src: 'https://img1.akspic.ru/image/13872-snajper-oruzhie-soldat-strajkbolnoe_oruzhie-pushka-1920x1080.jpg', alt: 'image slot', text: 'asdsadasd' }
    ]
  }
}
