<template>
  <div>
    <h1>Hi {{ id }}</h1>
    <input id="newCow" v-model="newCow" type="text" name="newCow" />
    <button @click="addCow">Add Cow</button>
    {{ cows }}
  </div>
</template>

<script>
// import { firestorePlugin } from 'vuefire'
import db from '~/plugins/firestore'
export default {
  data() {
    return {
      id: this.$store.state.user.uid,
      cows: [],
      newCow: null
    }
  },
  // watch: {
  //   id: {
  //     // call it upon creation too
  //     immediate: true,
  //     handler(id) {
  //       this.$bind('documents', db.collection('users').doc(id))
  //     }
  //   }
  // },
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
  firestore() {
    const uid = this.$store.state.user.uid
    return {
      cows: db.collection(`users/${uid}/cows`)
    }
  }

  // validate({ store }) {
  //   return store.state.user != null
  // }
}
</script>

<style lang="scss" scoped></style>
