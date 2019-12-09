<template>
  <v-card class="mx-auto">
    <v-card-title>
      <slot name="question"></slot>
    </v-card-title>
    <v-card-text class="headline font-weight-bold text-center">
      <slot></slot>
    </v-card-text>
    <v-card-text class="text-center">
      <slot name="reponse"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
