<template>
  <div class="divide-y border">
    <ServiceItem
      v-for="service in services"
      :key="service.id"
      :service="service"
    />
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
};
</script>
