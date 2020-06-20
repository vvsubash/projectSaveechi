<template>
  <main v-if="cow.name != null">
    <h1>{{ cow.name }}</h1>
    <section v-if="cow.state == 'justCalved'">
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

    <section v-else-if="cow.state == 'canBeInseminated'">
      cow can BE Inseminated
    </section>

    <section v-else-if="cow.state === 'inseminated'">
      <h4>
        <ul>
          <li>check for check 1</li>
          <li>check for check 2</li>
          <li>check for check 3</li>
          <li>check for stoping Milking</li>
        </ul>
      </h4>
    </section>

    <section v-else-if="cow.state == 'dry'">
      <h4>
        <ul>
          <li>1st Calcium</li>
          <!-- if calved is checked ask for
          dateofcalving details of calve and
          refresh the page -->
          <li>CheckBox for Calved</li>
        </ul>
      </h4>
    </section>

    <section v-else>
      <h2>There is some problem please contact support</h2>
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
          return ['canBeInseminated', 'inseminated']

        case 'canBeInseminated':
          return ['inseminated']

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
