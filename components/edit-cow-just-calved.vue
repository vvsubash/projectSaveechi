<template>
  <div>
    <h4>
      {{
        `She calved on ${cow.dateOfRecentCalving} and can be inseminated on need to fix on logic`
      }}
    </h4>
    <form @submit.prevent="updateCow">
      <label for="eventtoberecorded">Event To be recorded</label>

      <input
        id="recordHeat"
        v-model="eventtoberecorded"
        type="radio"
        name="eventtoberecorded"
        value="recordHeat"
      />
      <label for="recordHeat">Record Heat</label><br />
      <input
        id="inseminated"
        v-model="eventtoberecorded"
        type="radio"
        name="eventtoberecorded"
        value="inseminated"
      />
      <label for="inseminated">Inseminated</label><br />

      <section v-if="eventtoberecorded == 'recordHeat'">
        <label for="">Observed Heat</label>
        <input
          v-model="dateOfObservedHeat"
          type="date"
          name="dateOfObservedHeat"
        />
        <input type="submit" />
      </section>
      <section v-if="eventtoberecorded == 'inseminated'">
        <label for="dateOfInsemination">Date Of Insemination</label>
        <input
          v-model="dateOfInsemination"
          type="date"
          name="dateOfObservedHeat"
        />
        <input type="submit" />
      </section>
    </form>
    {{ eventtoberecorded }}
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
    },
    eventoBeRecorded: {
      type: String,
      default: null
    },
    dateOfObservedHeat: {
      type: Date,
      default: null
    },
    dateOfInsemination: {
      type: Date,
      default: null
    }
  },
  methods: {
    updateCow() {
      const uid = this.$store.state.user.uid
      const name = this.$route.params.editCow
      if (this.eventtoberecorded === 'recordHeat') {
        return db
          .collection(`users/${uid}/cows`)
          .doc(name)
          .set(
            {
              dateOfObservedHeat: new Date(this.dateOfObservedHeat)
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
              wasSheInseminated: true,
              state: 'inseminated'
            },
            { merge: true }
          )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
