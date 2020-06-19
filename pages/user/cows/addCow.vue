<template>
  <div>
    <label for="newCow">Name of the Animal</label>
    <input id="newCow" v-model="newCow" type="text" name="newCow" />
    <label for="state">What state is she is in</label>
    <select id="state" v-model="cowStateEntered" name="state">
      <option v-for="cowState in possibleCowStates" :key="cowState">{{
        cowState
      }}</option>
    </select>
    <label for="dateOfRecentCalving">Date of recent calving</label>
    <input v-model="dateOfRecentCalvingEntered" type="date" />
    <input
      id="wasSheInseminated"
      v-model="wasSheInseminated"
      type="checkbox"
      name="wasSheInseminated"
    />
    <label for="wasSheInseminated">Was She Inseminated</label>
    {{ whenCanSheBeInseminated }}
    <br />
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
          wasSheInseminated: this.wasSheInseminated,
          whenCanSheBeInseminated: this.whenCanSheBeInseminated
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
