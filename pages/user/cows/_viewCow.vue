<template>
  <main>
    <h1>{{ cow.name }}</h1>
    <section>
      {{ cow }}
      <!-- {{ cow.dateOfRecentCalving.toDate() }} -->
    </section>
  </main>
</template>

<script>
import db from '~/plugins/firestore'
export default {
  data() {
    return {
      cow: {},
      newStateOfCow: null
    }
  },

  firestore() {
    const name = this.$route.params.viewCow
    const uid = this.$store.state.user.uid
    return {
      cow: db.collection(`users/${uid}/cows`).doc(name)
    }
  }
}
</script>

<style lang="scss" scoped></style>
