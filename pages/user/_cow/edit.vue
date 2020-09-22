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
      <editCowInseminated :cow="cow" />
    </section>

    <section v-else-if="cow.state == 'dry'">
      <editCowDried />
    </section>

    <section v-else>
      <h2>There is some problem please contact support</h2>
    </section>
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
      //   return this.$store.getters['cows/cowz'](this.$route.params.cow)
      return this.$store.state.cows.cowsList.find(
        (x) => x.name === this.$route.params.cow
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
