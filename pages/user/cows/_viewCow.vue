<template>
  <main>
    <h1>
      <nuxt-link :to="'/user/cows/editcow/' + cow.name">{{
        cow.name
      }}</nuxt-link>
    </h1>
    <section>
      <h3>{{ cow.state }}</h3>
      <h3>
        Date of recent calving of cow:
        {{
          cow.dateOfRecentCalving != undefined
            ? cow.dateOfRecentCalving.toDate()
            : 'hello'
        }}
      </h3>
      <h3>
        She Can Be Inseminated on:
        {{
          cow.whenCanSheBeInseminated != undefined
            ? cow.whenCanSheBeInseminated.toDate()
            : 'Date Unknown'
        }}
      </h3>
      <h3>
        {{
          daysDelayed >= 0
            ? `She Can Be Inseminated in ${daysDelayed} days`
            : `Insemination is delayed by ${daysDelayed} days`
        }}
      </h3>
    </section>
  </main>
</template>

<script>
import { differenceInCalendarDays } from 'date-fns'
export default {
  data() {
    return {
      newStateOfCow: null
    }
  },
  computed: {
    daysDelayed() {
      return this.cow.whenCanSheBeInseminated !== undefined &&
        this.cow.whenCanSheBeInseminated === false
        ? differenceInCalendarDays(
            this.cow.whenCanSheBeInseminated.toDate(),
            new Date()
          )
        : '0'
    },
    cow() {
      return this.$store.state.cows.cows.find((x) => {
        return x.name === this.$route.params.viewCow
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
