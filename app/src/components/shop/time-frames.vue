<template>
  <div class="flex w-full flex-col gap-3">
    <p class="text-xl">Nossos horários</p>
    <div
      class="grid w-full grid-cols-2 flex-col gap-1 md:grid-cols-3 lg:grid-cols-7"
    >
      <Day v-for="(day, index) in days" :key="index" :day="day" />
    </div>
  </div>
</template>

<script>
import Day from "@/components/shop/time-frame-day.vue";

export default {
  components: {
    Day,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
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
};
</script>
