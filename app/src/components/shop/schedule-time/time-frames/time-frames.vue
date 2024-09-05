<template>
  <div class="flex w-full flex-col gap-3">
    <div class="flex flex-col">
      <span class="text-xs">Selecionado:</span>
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
    <p class="text-xl">Nossos horários disponíveis</p>
    <div class="flex flex-col divide-y border">
      <Day v-for="(day, index) in days" :key="index" :day="day" />
    </div>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-vue-next";
import Day from "@/components/shop/schedule-time/time-frames/time-frame-day.vue";

export default {
  components: {
    Edit,
    Button,
    Day,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
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
      services: [],
      days: [
        { name: "Domingo" },
        { name: "Segunda Feira" },
        { name: "Terça Feira" },
        { name: "Quarta Feira" },
        { name: "Quinta Feira" },
        { name: "Sexta Feira" },
        { name: "Sabado" },
      ],
    };
  },
  methods: {
    toggleService() {
      this.$store.commit("setService", null);
    },
  },
};
</script>
