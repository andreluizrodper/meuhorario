<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-1">
      <p class="text-center text-xl">Tudo certo!</p>
      <p class="text-center text-base">
        Esperamos você as {{ slot.slot.time }} no {{ slot.day.name }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <span class="text-xs text-gray-600">O seu qr code:</span>
      <qrcode-vue :value="confirm.id"></qrcode-vue>
    </div>
    <div class="flex justify-center">
      <p class="text-center text-xl font-bold">
        {{ service.name }}
      </p>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-600">Nosso endereço:</span>
      {{ shop.address }}
    </div>
    <div v-if="shop.phone" class="flex flex-col">
      <span class="text-xs text-gray-600">Nosso telefone:</span>
      {{ shop.phone }}
    </div>
    <div class="text-sm">O pagamento é feito diretamente na loja.</div>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    Button,
    QrcodeVue,
  },
  computed: {
    confirm() {
      return this.$store.state.confirm;
    },
    shop() {
      return this.$store.state.shop;
    },
    slot() {
      return this.$store.state.slot;
    },
    service() {
      return this.$store.state.service;
    },
  },
  methods: {
    doConfirm() {
      this.$store.commit("setConfirm", true);
    },
  },
};
</script>
