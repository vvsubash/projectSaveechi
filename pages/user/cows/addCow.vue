<template>
  <div>
    <v-form data-app class="text-center">
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="newCow"
              label="Name of the Animal"
              required
            ></v-text-field>
            <v-text-field
              v-model="dateOfRecentCalvingEntered"
              type="date"
              label="Date of recent calving"
            ></v-text-field>
            <v-select
              v-model="cowStateEntered"
              :items="possibleCowStates"
              label="State Of Cow"
              required
            ></v-select>
            <v-text-field
              v-show="
                cowStateEntered == 'inseminated' || cowStateEntered == 'dry'
              "
              v-model="sheWasInseminatedOn"
              type="date"
              label="She was inseminated on"
            ></v-text-field>

            <v-text-field
              v-show="cowStateEntered == 'dry'"
              v-model="driedOfOn"
              type="date"
              label="She was dried of on"
            ></v-text-field>
            <v-checkbox
              v-model="wasSheInseminated"
              label="Was She Inseminated"
              type="checkbox"
              required
              disabled
            ></v-checkbox>
            <v-btn outlined large @click="addCow">Add Cow</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <button @click="addCow">Add Cow</button>
  </div>
</template>

<script>
import { add } from 'date-fns'
import snakeCase from 'lodash.snakecase'
import db from '~/plugins/firestore'

export default {
  data() {
    return {
      newCow: null,
      cowType: null,
      possibleCowStates: ['justCalved', 'inseminated', 'dry'],
      cowStateEntered: null,
      dateOfRecentCalvingEntered: null,
      wasSheInseminated: false,
      sheWasInseminatedOn: null,
      driedOfOn: null
    }
  },
  computed: {
    whenCanSheBeInseminated() {
      return this.wasSheInseminated === false
        ? add(new Date(this.dateOfRecentCalvingEntered), { days: 77 })
        : null
    }
  },
  watch: {
    cowStateEntered: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.cowStateEntered === 'inseminated' || this.cowStateEntered === 'dry'
          ? (this.wasSheInseminated = true)
          : (this.wasSheInseminated = false)
      }
    }
  },
  methods: {
    addCow() {
      const newCow = snakeCase(this.newCow)
      switch (this.cowStateEntered) {
        case 'justCalved':
          db.collection(`users/${this.$store.state.user.uid}/cows`)
            .doc(newCow)
            .set({
              name: this.newCow,
              state: this.cowStateEntered,
              dateOfRecentCalving: new Date(this.dateOfRecentCalvingEntered)
            })
            .then(this.$router.push(`/user/cows/editcow/${this.newCow}`))
          break
        case 'inseminated':
          db.collection(`users/${this.$store.state.user.uid}/cows`)
            .doc(newCow)
            .set({
              name: this.newCow,
              state: this.cowStateEntered,
              dateOfRecentCalving: new Date(this.dateOfRecentCalvingEntered),
              sheWasInseminatedOn: new Date(this.sheWasInseminatedOn),
              check1: {
                isCompleted: false,
                isPassed: false,
                date: add(new Date(this.sheWasInseminatedOn), {
                  days: 18
                })
              },
              check2: {
                isCompleted: false,
                isPassed: false,
                date: add(new Date(this.sheWasInseminatedOn), {
                  days: 90
                })
              },
              shouldBeDriedOn: add(new Date(this.sheWasInseminatedOn), {
                days: 185
              }),
              expectedDateOfCalving: add(new Date(this.sheWasInseminatedOn), {
                days: 283
              })
            })
            .then(this.$router.push(`/user/cows/editcow/${this.newCow}`))
          break
        case 'dry':
          db.collection(`users/${this.$store.state.user.uid}/cows`)
            .doc(newCow)
            .set({
              name: this.newCow,
              state: this.cowStateEntered,
              dateOfRecentCalving: new Date(this.dateOfRecentCalvingEntered),
              sheWasInseminatedOn: new Date(this.sheWasInseminatedOn),
              driedOfOn: new Date(this.driedOfOn),
              expectedDateOfCalving: add(new Date(this.sheWasInseminatedOn), {
                days: 283
              })
            })
            .then(this.$router.push(`/user/cows/editcow/${this.newCow}`))
      }
    }
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
