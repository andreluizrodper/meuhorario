<template>
  <div class="flex w-full items-center justify-between bg-violet-900 px-4 py-2">
    <div class="text-white">
      <Logo :showTagLine="false" size="h-10" />
    </div>
    <div class="flex items-center gap-4">
      <Notifications v-if="account" />
      <UserMenu />
    </div>
  </div>
</template>

<script>
import Notifications from "@/components/dashboard/ui/notifications.vue";
import UserMenu from "@/components/dashboard/ui/user-menu.vue";
import Logo from "@/components/ui/logo.vue";

export default {
  components: {
    Notifications,
    UserMenu,
    Logo,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
};
</script>
