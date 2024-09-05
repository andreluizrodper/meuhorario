<template>
  <div class="rounded sm:border sm:p-4">
    <div class="mb-4 flex items-center justify-between">
      <p class="text-xl">Serviços</p>
      <div>
        <Button as-child
          ><router-link :to="{ name: 'service-add' }"
            >Adicionar serviço</router-link
          ></Button
        >
      </div>
    </div>
    <Loading v-if="loading" />
    <div v-if="!loading && !services" class="mt-4 text-center text-gray-400">
      Você ainda não tem nenhum serviço, crie um agora
    </div>
    <div v-if="services" class="flex flex-col gap-2">
      <div class="divide-y border">
        <ServiceItem
          v-for="service in services"
          :key="service.id"
          :service="service"
          @getData="getData"
        />
      </div>
      <div v-if="count > 3" class="flex justify-center">
        <Button variant="link" as-child>
          <router-link :to="{ name: 'service-list' }"
            >Ver todos ({{ count }})</router-link
          >
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/ui/loading.vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getServices } from "@/utils/services";
import ServiceItem from "./service-item.vue";
import { Button } from "@/components/ui/button";

export default {
  components: {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Loading,
    ServiceItem,
  },
  data() {
    return {
      count: null,
      loading: true,
      services: null,
    };
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
  },
  async mounted() {
    await this.getData();
    this.loading = false;
  },
  methods: {
    async getData() {
      this.services = await getServices({ shop_id: this.shop.id });
      this.count = this.services?.length;
      this.services?.splice(3);
    },
  },
};
</script>
