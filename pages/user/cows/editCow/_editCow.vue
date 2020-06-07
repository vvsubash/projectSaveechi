<template>
  <div>
    {{ cow }}
  </div>
</template>

<script>
import db from '~/plugins/firestore'

export default {
  data() {
    return {
      cow: null
    }
  },

  firestore() {
    const name = this.$route.params.editCow

    const uid = this.$store.state.user.uid
    return {
      cow: db.collection(`users/${uid}/cows`).doc(name)
    }
  }
}
</script>

<style lang="scss" scoped></style>
