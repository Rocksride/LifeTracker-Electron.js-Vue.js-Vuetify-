<template>
  <div>
    <v-alert color="error" icon="error" @input='onClose' dismissible :value='true'>
      {{ text }}
    </v-alert>
  </div>
</template>
<script>
export default {
  props: ['text'],
  methods: {
    onClose() {
      this.$emit('dismissed');
    }
  },
}
</script>
