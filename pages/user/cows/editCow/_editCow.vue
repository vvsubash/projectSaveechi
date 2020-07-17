<template>
  <main v-if="cow.name != null">
    <h1>{{ cow.name }}</h1>
    <section v-if="cow.state == 'justCalved'">
      <editCowJustCalved :cow="cow" />
    </section>

    <section v-else-if="cow.state == 'canBeInseminated'">
      <editCowJustCalved :cow="cow" />
    </section>

    <section v-else-if="cow.state === 'inseminated'">
      <editCowInseminated :cow="cow" :check1="check1" />
      {{ check1 }}
    </section>

    <section v-else-if="cow.state == 'dry'">
      <editCowDried />
    </section>

    <section v-else>
      <h2>There is some problem please contact support</h2>
    </section>
    {{ cow }}
  </main>
</template>

<script>
// import db from '~/plugins/firestore'
import editCowJustCalved from '~/components/edit-cow-just-calved'
import editCowInseminated from '~/components/edit-cow-inseminated'
import editCowDried from '~/components/edit-cow-dried'

export default {
  components: {
    editCowJustCalved,
    editCowInseminated,
    editCowDried
  },
  data() {
    return {}
  },
  computed: {
    cow() {
      return this.$store.state.cows.cows.find((x) => {
        return x.name === this.$route.params.editCow
      })
    }
  }
  // firestore() {
  //   const name = this.$route.params.editCow
  //   const uid = this.$store.state.user.uid
  //   return {
  //     cow: db.collection(`users/${uid}/cows`).doc(name)
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
