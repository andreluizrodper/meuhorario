<template>
  <div class="mx-auto max-w-xl py-6">
    <Card>
      <CardHeader>
        <div class="flex items-center gap-4">
          <router-link :to="{ name: 'front-shop' }">
            <ChevronLeft />
          </router-link>
          <div class="flex flex-col gap-2">
            <CardTitle> Marcar o seu horário </CardTitle>
            <CardDescription>
              Entre na sua conta, escolha o que você quer fazer e quando!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Auth v-if="account" />
        <div v-if="!account && !confirmation">
          <Services v-if="!service" />
          <TimeFrames v-if="service && !slot" />
          <Confirmation v-if="service && slot" />
        </div>
        <div v-if="!account && confirmation">
          <Done />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
<script>
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getServices } from "@/utils/services";
import Auth from "@/components/shop/schedule-time/auth/auth.vue";
import Services from "@/components/shop/schedule-time/services/services.vue";
import TimeFrames from "@/components/shop/schedule-time/time-frames/time-frames.vue";
import Confirmation from "@/components/shop/schedule-time/confirmation.vue";
import Done from "@/components/shop/schedule-time/done.vue";
import { ChevronLeft } from "lucide-vue-next";

export default {
  components: {
    ChevronLeft,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Label,
    Input,
    Button,
    Auth,
    Services,
    TimeFrames,
    Confirmation,
    Done,
  },
  props: {
    day: {
      type: Object,
    },
  },
  computed: {
    service() {
      return this.$store.state.service;
    },
    account() {
      return this.$store.state.account;
    },
    shop() {
      return this.$store.state.shop;
    },
    slot() {
      return this.$store.state.slot;
    },
    confirmation() {
      return this.$store.state.confirm;
    },
  },
  data() {
    return {
      services: [],
      dialog: false,
    };
  },
  async mounted() {
    this.services = await getServices();
  },
};
</script>
