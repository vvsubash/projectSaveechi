<template>
  <div>
    <h1>Hi {{ this.$store.state.user.uid }}</h1>
    <ul v-for="cow in cows" :key="cow.name">
      <li>
        <n-link :to="'/user/cows/editcow/' + cow.name"> {{ cow }}</n-link>
      </li>
    </ul>
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
