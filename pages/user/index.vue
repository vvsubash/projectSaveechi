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
export default {
  data() {
    return {
      cows: this.$store.state.cows.cows,
      uid: this.$store.state.user.uid
    }
  },
  beforeCreate() {
    this.$store.dispatch('cows/getCows')
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
