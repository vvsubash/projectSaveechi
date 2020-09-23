<template>
  <div>
    <h4>
      {{
        `She calved on ${cow.dateOfRecentCalving} and can be inseminated on need to fix on logic`
      }}
    </h4>
    <v-form data-app>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              v-model="eventToBeRecorded"
              :items="eventsThatCanBeRecorded"
              label="Event to be recorded"
              required
            ></v-select>
            <v-text-field
              v-show="eventToBeRecorded == 'recordHeat'"
              v-model="dateOfObservedHeat"
              type="date"
              label="Date of observed heat"
            ></v-text-field>
            <v-text-field
              v-show="eventToBeRecorded == 'inseminated'"
              v-model="dateOfInsemination"
              type="date"
              label="Date of Insemination"
            ></v-text-field>
            <v-text-field
              v-show="eventToBeRecorded == 'inseminated'"
              v-model="semenIdNumber"
              label="Semen Id Number"
            ></v-text-field>
            <v-btn outlined large @click="updateCow">Add Cow</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import snakeCase from 'lodash.snakecase'
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
      eventsThatCanBeRecorded: ['recordHeat', 'inseminated'],
      dateOfObservedHeat: null,
      dateOfInsemination: null,
      semenIdNumber: null
    }
  },
  methods: {
    updateCow() {
      const uid = this.$store.state.user.uid
      const name = snakeCase(this.$route.params.cow)
      this.eventToBeRecorded === 'recordHeat'
        ? db
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
        : db
            .collection(`users/${uid}/cows`)
            .doc(name)
            .set(
              {
                dateOfRecentCalving: this.cow.dateOfRecentCalving,
                state: 'inseminated',
                sheWasInseminatedOn: new Date(this.dateOfInsemination),
                semenId: this.semenIdNumber,
                isSheMilking: true
              },
              { merge: true }
            )
    }
  }
}
</script>

<style lang="scss" scoped></style>
