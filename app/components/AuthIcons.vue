<template>
  <div>
    <UButton
      v-if="isAuthenticated"
      variant="ghost"
      icon="i-heroicons-user-circle"
      label="User"
      @click="authStore.toggleOpenUser"
      :loading="loading"
    />
    <UButton
      v-else
      variant="ghost"
      icon="i-heroicons-arrow-right-end-on-rectangle"
      label="Login"
      @click="authStore.toggleOpenLogin"
      :loading="loading"
    />

    <!-- Login modal -->
    <USlideover
      v-model:open="openLogin"
      title="Login"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <template #body>
        <h1>Login</h1>
        <LoginForm :loading="loading" />
        <button @click="openRegister = !openRegister">Register</button>
      </template>
    </USlideover>

    <!-- Registrer modal -->
    <USlideover
      v-model:open="openRegister"
      title="Register"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <template #body>
        <RegisterForm :loading="loading" />
      </template>
    </USlideover>

    <!-- User modal -->
    <USlideover
      v-model:open="openUser"
      title="Account"
      description="This is your personal space, enjoy."
    >
      <template #body>
        <UButton
          icon="i-heroicons-arrow-right-start-on-rectangle"
          label="Logout"
          color="error"
          @click="authStore.logout"
          :loading="loading"
        />
      </template>
    </USlideover>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { loading, openLogin, openRegister, openUser, isAuthenticated } =
  storeToRefs(authStore);
</script>
