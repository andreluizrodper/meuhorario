<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <AccountAvatar v-if="account" :id="account.id" />
    </DropdownMenuTrigger>
    <DropdownMenuContent v-if="account" align="end">
      <DropdownMenuLabel>{{ account.name }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem> Minha conta </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="logOut">
        <LogOut size="16" class="mr-2" />
        Sair
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script>
import { LoaderCircle } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-vue-next";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase.js";
import AccountAvatar from "@/components/ui/account-avatar.vue";

export default {
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  components: {
    AccountAvatar,
    LoaderCircle,
    LogOut,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    Avatar,
    AvatarFallback,
  },
  methods: {
    logOut() {
      signOut(auth).then(() => {
        this.$store.commit("setAccount", null);
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>
