<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      no-animation
      indicators
      background="white"
      img-width="1024"
      img-height="300"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide v-for="(slide, index) in sliderItems" :key="index">
        <template v-slot:img>
          <img
            :src="slide.src"
            :alt="slide.alt"
            width=60%
            height=60%
          >
        </template>
        <p>{{slide.text}}</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  computed: {
    ...mapState('slider', [
      'sliderItems'
    ])
  }
}
</script>
