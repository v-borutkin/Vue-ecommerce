<template>
  <b-button
    v-b-tooltip.hover
    :title="title"
    variant="outline-success"
    @click="$emit('click')">
    <slot />
  </b-button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  name: 'UiButton'
}
</script>

<style scoped>

</style>
