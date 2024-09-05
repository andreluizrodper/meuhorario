<template>
  <div class="flex h-[100vh] flex-col">
    <NavBar />
    <div v-if="account" class="flex flex-1 bg-gray-50">
      <div class="flex w-full flex-1 border-l p-2 sm:px-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import NavBar from "@/components/dashboard/ui/nav-bar.vue";
import Menu from "@/components/dashboard/ui/menu.vue";

export default {
  components: {
    RouterView,
    NavBar,
    Menu,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
};
</script>
