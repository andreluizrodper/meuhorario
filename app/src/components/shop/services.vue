<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <p class="text-xl">Nossos serviços</p>
      <Button @click="scheduleTime"> Marcar meu horário </Button>
    </div>
    <div class="divide-y border">
      <ServiceItem
        v-for="service in services"
        :key="service.id"
        :service="service"
      />
    </div>
  </div>
</template>

<script>
import ServiceItem from "./service-item.vue";
import { getServices } from "@/utils/services";
import { Button } from "@/components/ui/button";

export default {
  components: {
    Button,
    ServiceItem,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
  },
  data() {
    return {
      services: [],
    };
  },
  async mounted() {
    this.services = await getServices();
  },
  methods: {
    scheduleTime() {
      this.$store.commit("setConfirm", null);
      this.$store.commit("setSlot", null);
      this.$store.commit("setService", null);
      this.$router.push({ name: "schedule-time" });
    },
  },
};
</script>
