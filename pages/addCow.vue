<template>
  <div>
    <input id="newCow" v-model="newCow" type="text" name="newCow" />
    <button @click="addCow">Add Cow</button>
  </div>
</template>

<script>
import db from '~/plugins/firestore'

export default {
  data() {
    return {
      newCow: null
    }
  },
  methods: {
    addCow() {
      const newCow = this.newCow
      db.collection(`users/${this.$store.state.user.uid}/cows`)
        .doc(newCow)
        .set({
          name: this.newCow
        })
    }
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style lang="scss" scoped></style>
