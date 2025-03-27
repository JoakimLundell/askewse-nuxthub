<template>
  <header class="header">
    <ChatIcons />
    <NuxtLink to="/">askew</NuxtLink>
    <AuthIcons />
  </header>
</template>

<script setup>
import ChatIcons from "./ChatIcons.vue";
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: var(--background);
  height: var(--header);
  position: fixed;
  inset-inline: 0;
  top: 0;
  padding: 0 12px;
}
.header > *:first-child,
.header > *:last-child {
  flex: 1;
}
.header > *:last-child {
  text-align: right;
}
.header > *:first-child {
  text-align: left;
}
</style>
