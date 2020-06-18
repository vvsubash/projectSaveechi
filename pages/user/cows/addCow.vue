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
    <br />
    <button @click="addCow">Add Cow</button>
  </div>
</template>

<script>
import db from '~/plugins/firestore'

export default {
  data() {
    return {
      newCow: null,
      cowType: null,
      possibleCowStates: [
        'justCalved',
        'canBeInseminated',
        'insseminated',
        'dry'
      ],
      cowStateEntered: null,
      dateOfRecentCalvingEntered: null,
      wasSheInseminated: true
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
    }
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
