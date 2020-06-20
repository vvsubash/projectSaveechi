<template>
  <main v-if="cow.name != null">
    <h1>{{ cow.name }}</h1>
    <section v-if="cow.state == 'justCalved'">
      <!-- <h4>
        {{
          `She calved on ${cow.dateOfRecentCalving} and can be inseminated on need to fix on logic`
        }}
      </h4>
      <form @submit.prevent="updateCow">
        <label for="observedHeat">Observed Heat</label>
        <input v-model="ck" type="date" name="observedHeat" />
        <input type="submit" />
      </form> -->
      <editCowJustCalved />
    </section>

    <section v-else-if="cow.state == 'canBeInseminated'">
      <editCowJustCalved />
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
import editCowJustCalved from '~/components/edit-cow-just-calved'
export default {
  components: {
    editCowJustCalved
  },
  data() {
    return {
      cow: {},
      newStateOfCow: null,
      ck: null
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
