<template setup>
  <div v-if="!ready" class="flex h-[100vh] items-center justify-center">
    <Loading />
  </div>
  <RouterView v-if="ready" />
  <Toaster />
  <Dialog />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase.js";
import { RouterView } from "vue-router";
import { loginAccount, accountExists } from "@/utils/account.js";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Dialog from "@/components/ui/dialog.vue";
import Loading from "@/components/ui/loading.vue";

export default {
  components: {
    RouterView,
    Toaster,
    Loading,
    Dialog,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  data() {
    return {
      ready: false,
    };
  },
  name: "App",
  created() {
    onAuthStateChanged(auth, async (user) => {
      if (user && !this.account) {
        const checkAccountExists = await accountExists({ owner: user.uid });
        if (checkAccountExists) {
          this.$store.commit("setUser", user);
          loginAccount({ id: user.uid });
        }
      }
      this.ready = true;
    });
  },
};
</script>
