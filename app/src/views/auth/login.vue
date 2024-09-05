<template>
  <div class="space-y-1 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Bem-vindo!</h1>
    <p class="text-gray-500">
      Coloque o seu número aqui embaixo para entrar na plataforma
    </p>
  </div>
  <UserSmsForm />
</template>

<script setup>
import UserSmsForm from "@/components/auth/sms-form.vue";
</script>
