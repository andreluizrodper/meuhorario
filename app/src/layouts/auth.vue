<template>
  <div class="flex min-h-[100vh] flex-col md:flex-row lg:px-0">
    <div class="sticky top-0 flex h-[100vh] max-h-[300px] w-full sm:max-h-full">
      <Button as-child class="absolute left-4 top-4 z-30" variant="white">
        <router-link :to="{ name: 'Home' }" class="flex gap-2">
          <Home />
          Voltar
        </router-link>
      </Button>
      <div
        class="absolute inset-0 flex items-center justify-center overflow-hidden bg-violet-700"
      ></div>
    </div>
    <div class="flex items-center p-8 sm:min-w-[520px]">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div class="relative z-20 flex justify-center">
          <Logo />
        </div>
        <RouterView v-if="!loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Logo from "@/components/ui/logo.vue";
import { Home } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

export default {
  components: {
    RouterView,
    Logo,
    Home,
    Button,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.loading = false;
  },
};
</script>
