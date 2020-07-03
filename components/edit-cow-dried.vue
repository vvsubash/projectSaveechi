<template>
  <FormulateForm v-model="formValues" class="login-form" @submit="hi">
    <FormulateInput
      v-model="value"
      :options="{
        first: 'First',
        second: 'Second'
      }"
      type="radio"
      label="This is a label for all the options"
    />
    {{ formValues + value }}
    <FormulateInput type="submit" label="Register" />
  </FormulateForm>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      value: 'second'
    }
  },
  methods: {
    hi() {
      alert(this.formValues)
    }
  }
}
</script>
