export default {
  methods: {
    formatDate (date) {
      return new Date(date)
        .toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
    }
  }
}
