import { port } from '@/consts'

export default {
  methods: {
    imgUrl (url) {
      return `${port}/media/${url}`
    }
  }
}
