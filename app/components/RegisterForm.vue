<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      label="Your Nic"
      name="name"
    >
      <UInput v-model="state.name" />
    </UFormField>
    <UFormField
      label="Email"
      name="email"
    >
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
      />
    </UFormField>

    <UButton
      type="submit"
      :loading="loading"
    >
      Submit
    </UButton>
  </UForm>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
const props = defineProps({ loading: { type: Boolean } });
const authStore = useAuthStore();

const state = reactive({
  name: "Joqe",
  email: "jocke@bluestripes.se", //undefined,
  password: "password", //undefined,
});

const validate = (state) => {
  const errors = [];
  if (!state.name) errors.push({ name: "name", message: "Required" });
  if (!state.email) errors.push({ name: "email", message: "Required" });
  if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
};

async function onSubmit(event) {
  authStore.register(state.name, state.email, state.password);
}
</script>
