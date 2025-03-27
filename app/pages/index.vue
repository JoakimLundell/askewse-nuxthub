<template>
  <section style="background-color: red">
    <UButton
      icon="i-heroicons-chat-bubble-left-solid"
      variant="subtle"
      >Button</UButton
    >
  </section>
  <section>
    <UButton
      :loading="true"
      loading-icon="i-heroicons-academic-cap"
      >Sida 2</UButton
    >
  </section>
  <section>
    <UButton
      :loading="true"
      loading-icon="i-heroicons-academic-cap"
      >Sida 3</UButton
    >
  </section>
</template>
<script setup></script>

<style scoped>
section {
  height: calc(100vh - var(--header));
}
section:first-of-type {
  margin-top: var(--header);
}
</style>
