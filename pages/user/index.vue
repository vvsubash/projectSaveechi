<template>
  <v-app class="dashboard">
    <h1>Hi {{ uid }}</h1>
    <nuxt-link to="/user/cows/addcow">Add Cows</nuxt-link>
    <!-- <ul v-for="cow in cows" :key="cow.name">
      <li>
        <nuxt-link :to="'/user/cows/' + cow.name">{{ cow.name }}</nuxt-link>
      </li>
    </ul>-->
    <v-container class="my-5">
      <v-card v-for="cow in cows" :key="cow.name" flat class="pa-3">
        <v-layout row wrap class="pa-3">
          <v-flex xs12 md6>
            <div class="caption grey--text">Name</div>
            <nuxt-link :to="'/user/cows/editcow/' + cow.name"
              >{{ cow.name }}
            </nuxt-link>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">State</div>
            <p>{{ cow.state }}</p>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">State</div>
            <p>{{ cow.state }}</p>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">State</div>
            <p>{{ cow.state }}</p>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      cows: this.$store.state.cows.cows,
      uid: this.$store.state.user.uid
    }
  },
  beforeCreate() {
    this.$store.dispatch('cows/getCows')
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style></style>
