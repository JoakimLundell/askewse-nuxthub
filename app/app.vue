<template>
  <UApp>
    <AskewHeader />
    <NuxtPage />
  </UApp>
</template>

<script setup>
import { useAuthStore } from "./store/auth";

onMounted(() => {
  //const authStore = useAuthStore();
  //authStore.init();
});
</script>

<style>
html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

section {
  scroll-snap-align: start;
  scroll-margin-top: var(--header);
  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
}
</style>
