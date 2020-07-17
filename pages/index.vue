<template>
  <div class="container">
    <!-- TODO need to refactor -->
    <header>
      <button @click="signIn">Login</button>
    </header>
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
