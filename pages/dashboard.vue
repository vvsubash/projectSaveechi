<template>
  <div>
    <h1>Hi</h1>
    {{ cows }}
  </div>
</template>

<script>
// import { firestorePlugin } from 'vuefire'
import db from '~/plugins/firestore'
export default {
  data() {
    return {
      cows: []
    }
  },
  // watch: {
  //   id: {
  //     // call it upon creation too
  //     immediate: true,
  //     handler(id) {
  //       this.$bind('documents', db.collection('users').doc(id))
  //     }
  //   }
  // },

  firestore() {
    const uid = this.$store.state.user.uid
    return {
      cows: db.collection(`users/${uid}/cows`)
    }
  },

  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
