<template>
  <div>
    <h1>Hi {{ uid }}</h1>
    <nuxt-link to="/user/cows/addcow">Add Cows</nuxt-link>
    <ul v-for="cow in cows" :key="cow.name">
      <li>
        <nuxt-link :to="'/user/cows/' + cow.name">{{ cow.name }}</nuxt-link>
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
  firestore() {
    return {
      cows: db.collection(`users/${this.uid}/cows`)
    }
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
