<template>
  <main>
    <h1>
      {{ cow.name }}
    </h1>
    <section>
      <form @submit.prevent="updateCow">
        <label for="state">What state is she is in</label>
        <select id="state" v-model="cow.state" name="state">
          <option value="justCalved">justCalved</option>
          <option value="canBeInseminated">Can Be Inseminated</option>
          <option value="inseminated">inseminated</option>
          <option value="inseminatedAndConfirmed">
            Inseminated and confirmed
          </option>
          <option value="dry">Dry</option>
          <option value="failedInsemination">Insemination Failed</option>
        </select>
        <label for="dateOfRecentCalving">Date of recent calving</label>

        <input v-model="dateOfRecentCalving" type="date" />
        <input type="submit" />
      </form>
    </section>
  </main>
</template>

<script>
import db from '~/plugins/firestore'
export default {
  data() {
    return {
      cow: {}
    }
  },

  firestore() {
    const name = this.$route.params.editCow
    const uid = this.$store.state.user.uid
    return {
      cow: db.collection(`users/${uid}/cows`).doc(name)
    }
  },
  methods: {
    updateCow() {
      const uid = this.$store.state.user.uid
      const name = this.$route.params.editCow
      return db
        .collection(`users/${uid}/cows`)
        .doc(name)
        .set(
          {
            state: this.cow.state,
            dateOfRecentCalving: new Date(this.cow.dateOfRecentCalving)
          },
          { merge: true }
        )
    }
  }
}
</script>

<style lang="scss" scoped></style>
