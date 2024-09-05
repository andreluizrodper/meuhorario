<template>
  <div class="space-y-1 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">
      Você recebeu um código!
    </h1>
    <p class="text-gray-500">Adicione o código para entrar na sua conta</p>
  </div>
  <UserPinForm />
</template>

<script setup>
import UserPinForm from "@/components/auth/sms-pin.vue";
</script>
