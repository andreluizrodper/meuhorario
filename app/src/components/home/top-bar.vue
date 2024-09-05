<template>
  <div class="sticky left-0 right-0 top-0 bg-white">
    <div class="section-wrapper spread-center">
      <Logo />
      <div class="flex">
        <Button as-child variant="link" class="hidden sm:block">
          <a href="#precos">Preços</a></Button
        >
        <Button as-child variant="purple">
          <router-link :to="{ name: 'login' }">Entrar</router-link>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "@/components/ui/logo.vue";
import { Button } from "@/components/ui/button";
</script>
