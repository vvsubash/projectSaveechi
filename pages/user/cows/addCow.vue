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
import db from '~/plugins/firestore'

export default {
  data() {
    return {
      newCow: null,
      cowType: null,
      possibleCowStates: [
        'justCalved',
        'canBeInseminated',
        'inseminated',
        'dry'
      ],
      cowStateEntered: null,
      dateOfRecentCalvingEntered: null,
      wasSheInseminated: false
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
      const newCow = this.newCow
      db.collection(`users/${this.$store.state.user.uid}/cows`)
        .doc(newCow)
        .set({
          name: this.newCow,
          state: this.cowStateEntered,
          dateOfRecentCalving: new Date(this.dateOfRecentCalvingEntered),
          wasSheInseminated: this.wasSheInseminated
        })
        .then(
          this.cowStateEntered === 'inseminated' ||
            this.cowStateEntered === 'dry'
            ? this.$router.push(`/user/cows/editcow/${this.newCow}`)
            : this.$router.push('/user')
        )
    }
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
