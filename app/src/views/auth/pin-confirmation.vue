<template>
  <div class="space-y-1 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Bem-vindo</h1>
    <p class="text-gray-500">Entre na sua conta!</p>
  </div>
  <UserPinForm />
</template>

<script setup>
import UserPinForm from "@/components/auth/sms-pin.vue";
</script>
