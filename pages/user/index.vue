<template>
  <v-app class="dashboard">
    <h1>Hi {{ uid }}</h1>
    <nuxt-link to="/user/addcow">Add Cows</nuxt-link>
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
            <nuxt-link :to="`/user/${cow.name}/edit`"
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
            <div class="caption grey--text">Delete</div>
            <v-icon @click="deleteCow(cow.name)">mdi-delete</v-icon>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import snakeCase from 'lodash.snakecase'
import db from '~/plugins/firestore'

export default {
  data() {
    return {
      cows: this.$store.state.cows.cowsList,
      uid: this.$store.state.user.uid
    }
  },
  beforeCreate() {
    this.$store.dispatch('cows/getCows')
  },
  methods: {
    deleteCow(name) {
      db.collection(`users/${this.$store.state.user.uid}/cows`)
        .doc(snakeCase(name))
        .delete()
        .then(function() {
          console.log('Document successfully deleted!')
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    }
  },
  validate({ store }) {
    return store.state.user != null
  }
}
</script>

<style></style>
