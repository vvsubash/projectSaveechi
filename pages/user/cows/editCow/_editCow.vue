<template>
  <main>
    <h1>
      {{ cow.name }}
    </h1>
    <section>
      <form action="">
        <label for="dateOfRecentCalving">Date of recent calving</label>
        <input v-model="dateOfRecentCalving" type="date" />
        {{ dateOfRecentCalving }}
        <p>
          <!-- {{ heatDataController('justCalved', new Date(dateOfRecentCalving)) }} -->
        </p>
      </form>
    </section>
  </main>
</template>

<script>
import db from '~/plugins/firestore'
export default {
  data() {
    return {
      cow: {},
      dateOfRecentCalving: null
    }
  },

  firestore() {
    const name = this.$route.params.editCow
    const uid = this.$store.state.user.uid
    return {
      cow: db.collection(`users/${uid}/cows`).doc(name)
    }
  }
}
</script>

<style lang="scss" scoped></style>
