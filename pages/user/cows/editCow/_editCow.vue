<template>
  <main>
    <h1>
      {{ cow }}
    </h1>
    <section>
      <form action="">
        <label for="dateOfRecentCalving">Date of recent calving</label>
        <input v-model="dateOfRecentCalving" type="date" />
        {{ dateOfRecentCalving }}
        <p>
          {{ heatDataController('justCalved', new Date(dateOfRecentCalving)) }}
        </p>
      </form>
    </section>
  </main>
</template>

<script>
import { format, add } from 'date-fns'

import db from '~/plugins/firestore'
export default {
  data() {
    return {
      cow: null,
      dateOfRecentCalving: null
    }
  },

  firestore() {
    const name = this.$route.params.editCow
    const uid = this.$store.state.user.uid
    return {
      cow: db.collection(`users/${uid}/cows`).doc(name)
    }
  },
  computed: {},
  methods: {
    heatDataController(state, date) {
      switch (state) {
        case 'justCalved':
          return {
            dateOfRecentCalving: format(date, 'dd/MM/yyyy'),
            whenCanSheBeInseminated: format(
              add(date, {
                days: 77
              }),
              'dd/MM/yyyy'
            )
          }

        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
