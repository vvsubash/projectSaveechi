<template>
  <main>
    <h1>
      {{ cow.name }}
    </h1>
    <section>
      <form @submit.prevent="updateCow">
        <label for="state">What state is she is in</label>
        <select id="state" v-model="newStateOfCow" name="state">
          <option
            v-for="stateToBe in stateCanBe"
            :key="stateToBe"
            :value="stateToBe"
            >{{ stateToBe }}</option
          >
        </select>
        <label for="dateOfRecentCalving">Date of recent calving</label>

        <input v-model="cow.dateOfRecentCalving" type="date" />

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
      cow: {},
      newStateOfCow: null
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
    stateCanBe() {
      switch (this.cow.state) {
        case 'justCalved':
          return ['canBeInseminated', 'Inseminated']

        case 'canBeInseminated':
          return ['Inseminated']

        case 'inseminated':
          return ['dried', 'misscarried']

        case 'dried':
          return ['justCalved', 'misscarried']

        case 'misscarried':
          return ['canBeInseminated']

        default:
          return ['Somethings Wrong', 'justCalved']
          // eslint-disable-next-line no-unreachable
          break
      }
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
            state: this.newStateOfCow,
            dateOfRecentCalving: new Date(this.cow.dateOfRecentCalving)
          },
          { merge: true }
        )
    }
  }
}
</script>

<style lang="scss" scoped></style>
