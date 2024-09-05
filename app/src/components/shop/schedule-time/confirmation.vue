<template>
  <div class="flex flex-col gap-4">
    <p class="text-center text-xl">Vamos confirmar o seu horário</p>
    <div class="flex flex-col">
      <span class="text-xs text-gray-600">O que você vai fazer:</span>
      <div class="flex justify-between">
        <p class="text-xl font-bold">
          {{ service.name }}
        </p>
        <div class="flex items-center gap-2">
          <span>{{ value }}</span>
          <Button variant="outline" size="sm" @click="toggleService">
            <Edit size="16" />
          </Button>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-600">Data e horário:</span>
      <p class="text-xl font-bold">
        {{ slot.day.name }} às {{ slot.slot.time }}
      </p>
    </div>
    <div class="flex justify-center">
      <Loading v-if="loading" />
      <Button v-if="!loading" class="w-full" @click="doConfirm"
        >Confirmar</Button
      >
    </div>
  </div>
</template>

<script>
import { Edit } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { createTimeSchedule } from "@/utils/time-schedule";
import Loading from "@/components/ui/loading.vue";

export default {
  components: {
    Loading,
    Button,
    Edit,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    slot() {
      return this.$store.state.slot;
    },
    service() {
      return this.$store.state.service;
    },
    value() {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(this.service.value);
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async doConfirm() {
      this.loading = true;
      const schedule = await createTimeSchedule({
        data: {
          slot: this.slot,
          service: this.service,
          shop_id: this.shop.id,
        },
      });
      this.loading = false;
      this.$store.commit("setConfirm", schedule);
    },
    toggleService() {
      this.$store.commit("setService", false);
    },
  },
};
</script>
