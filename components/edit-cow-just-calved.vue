<template>
  <div>
    <h4>
      {{
        `She calved on ${cow.dateOfRecentCalving} and can be inseminated on need to fix on logic`
      }}
    </h4>
    <form @submit="updateCow">
      <label for="eventToBeRecorded">Event To be recorded</label>

      <input
        id="recordHeyarn devat"
        v-model="eventToBeRecorded"
        type="radio"
        name="eventToBeRecorded"
        value="recordHeat"
      />
      <label for="recordHeat">Record Heat</label><br />
      <input
        id="inseminated"
        v-model="eventToBeRecorded"
        type="radio"
        name="eventToBeRecorded"
        value="inseminated"
      />
      <label for="inseminated">Inseminated</label>
      <br />

      <section v-if="eventToBeRecorded == 'recordHeat'">
        <label for>Observed Heat</label>
        <input
          v-model="dateOfObservedHeat"
          type="date"
          name="dateOfObservedHeat"
        />
        <input type="submit" />
      </section>
      <section v-if="eventToBeRecorded == 'inseminated'">
        <label for="dateOfInsemination">Date Of Insemination</label>
        <input
          v-model="dateOfInsemination"
          type="date"
          name="dateOfInsemination"
        />
        <label for="semenIdNumber">Semen Id Number</label>
        <input v-model="semenIdNumber" type="date" name="dateOfObservedHeat" />
        <input type="submit" />
      </section>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '~/plugins/firestore'
import 'firebase/firestore'
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
      eventToBeRecorded: 'recordHeat',
      dateOfObservedHeat: null,
      dateOfInsemination: null,
      semenIdNumber: null
    }
  },
  methods: {
    updateCow() {
      const uid = this.$store.state.user.uid
      const name = this.$route.params.editCow
      if (this.eventToBeRecorded === 'recordHeat') {
        return db
          .collection(`users/${uid}/cows`)
          .doc(name)
          .set(
            {
              dateOfObservedHeat: firebase.firestore.FieldValue.arrayUnion(
                new Date(this.dateOfObservedHeat)
              )
            },
            { merge: true }
          )
      } else {
        return db
          .collection(`users/${uid}/cows`)
          .doc(name)
          .set(
            {
              sheWasInseminatedOn: new Date(this.dateOfInsemination),
              state: 'inseminated',
              semenIdNumber: this.semenIdNumber
            },
            { merge: true }
          )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
