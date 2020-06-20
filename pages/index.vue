<template>
  <div class="container">
    <!-- TODO need to refactor -->
    <button @click="signIn">Login</button>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    }
  }
}
</script>

<style></style>
