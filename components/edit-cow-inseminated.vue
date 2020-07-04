<template>
  <div>
    <h4>
      {{
        `She calved on ${cow.dateOfRecentCalving} and inseminated on ${cow.sheWasInseminatedOn}`
      }}
    </h4>
    <form @submit.prevent="updateCow">
      <input id="check1" v-model="check1" type="checkbox" name="check1" />
      <label for="check1">1st confirmation</label>
      <br />
      <input id="check2" v-model="check2" type="checkbox" name="check2" />
      <label for="check2">2st confirmation</label>
      <br />
      <input id="check1" v-model="check3" type="checkbox" name="check3" />
      <label for="check1">3rd confirmation</label>
      <br />
      <input id="driedOf" v-model="driedOf" type="checkbox" name="driedOf" />
      <label for="driedOf">Dried Of</label>
      <br />
      {{ driedOf }}
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import db from '~/plugins/firestore'
export default {
  props: {
    cow: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      check1: this.cow.isCheckOneCompleted,
      check2: this.cow.isCheckTwoCompleted,
      check3: this.cow.isCheckThreeCompleted,
      driedOf: false
    }
  },
  methods: {
    updateCow() {
      const uid = this.$store.state.user.uid
      const name = this.$route.params.editCow
      if (this.driedOf === true) {
        return db
          .collection(`users/${uid}/cows`)
          .doc(name)
          .set({
            state: 'dry',
            driedOfOn: 'new Date()'
          })
      } else {
        return db
          .collection(`users/${uid}/cows`)
          .doc(name)
          .set(
            {
              isCheckOneCompleted: this.check1,
              isCheckTwoCompleted: this.check2,
              isCheckThreeCompleted: this.check3
            },
            { merge: true }
          )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
