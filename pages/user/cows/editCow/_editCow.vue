<template>
  <main>
    <h1>
      {{ cow.name }}
    </h1>
    <section>
      <form action="">
        <label for="state">What state is she is in</label>
        <select id="state" v-model="state" name="state">
          <option value="justCalved">justCalved</option>
          <option value="inseminated">inseminated</option>
          <option value="inseminatedAndConfirmed">
            Inseminated and confirmed
          </option>
          <option value="dry">Dry</option>
          <option value="failedInsemination">Insemination Failed</option>
        </select>
        <label for="dateOfRecentCalving">Date of recent calving</label>

        <input v-model="dateOfRecentCalving" type="date" />
        {{ state }}
        {{ dateOfRecentCalving }}
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
      state: null,
      dateOfRecentCalving: null
    }
  },

  firestore() {
    const name = this.$route.params.editCow
    const uid = this.$store.state.user.uid
    return {
      cow: db.collection(`users/${uid}/cows`).doc(name)
    }
  },
  computed: {
    name() {
      return this.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
