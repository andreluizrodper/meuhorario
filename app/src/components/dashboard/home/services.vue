<template>
  <div class="flex flex-col gap-4">
    <p class="text-xl">Os serviços que você presta:</p>
    <div class="divide-y">
      <ServiceItem v-for="service in services" :key="service.uuid" />
    </div>
    <AddService @updateServices="getData" />
    <hr />
    <div class="flex justify-center">
      <Button @click="toggleStep(2)" :disabled="services.lenght < 1">
        Ajustar sua agenda
      </Button>
    </div>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
import ServiceItem from "@/components/dashboard/home/service-item.vue";
import AddService from "@/components/dashboard/home/add-service.vue";
import { getServices } from "@/utils/services";

export default {
  components: {
    ServiceItem,
    Button,
    AddService,
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
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.services = await getServices({ shop: this.shop.id });
    },
  },
};
</script>
