<template>
  <div class="container">Hi {{ id }}</div>
</template>

<script>
// import { firestorePlugin } from 'vuefire'
import db from '~/plugins/firestore'
export default {
  data() {
    return {
      id: this.$store.state.user.uid
    }
  },
  watch: {
    id: {
      // call it upon creation too
      immediate: true,
      handler(id) {
        this.$bind('documents', db.collection('users').doc(id))
      }
    }
  }

  // validate({ store }) {
  //   return store.state.user != null
  // }
}
</script>

<style lang="scss" scoped></style>
