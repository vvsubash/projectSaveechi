<template>
  <div>
    <h1>Hi {{ this.$store.state.user.uid }}</h1>
    <ul v-for="cow in cows" :key="cow.name">
      <li>
        <n-link :to="'/user/cows/' + cow.name"> {{ cow.name }}</n-link>
      </li>
    </ul>
  </div>
</template>

<script>
import db from '~/plugins/firestore'
export default {
  data() {
    return {
      cows: [],
      uid: this.$store.state.user.uid
    }
  },
  watch: {
    uid: {
      // call it upon creation too
      immediate: true,
      handler(uid) {
        this.$bind('cows', db.collection(`users/${uid}/cows`))
      }
    }
  },

  // firestore() {
  //   const uid = this.$store.state.user.uid
  //   return {
  //     cows: db.collection(`users/${uid}/cows`)
  //   }
  // },

  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
