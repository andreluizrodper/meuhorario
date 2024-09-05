<template>
  <div class="w-full">
    <div class="mx-auto my-2 max-w-4xl">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <router-link :to="{ name: 'shop' }">
              <ChevronLeft />
            </router-link>
            <div class="flex flex-1 flex-col gap-2">
              <CardTitle>Serviços</CardTitle>
              <CardDescription>{{ shop.name }}</CardDescription>
            </div>
            <div>
              <Button as-child>
                <router-link :to="{ name: 'service-add' }">
                  Adicionar serviço
                </router-link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex justify-end">
            <div class="flex items-center gap-2">
              <Label>Buscar</Label>
              <Input v-model="search" placeholder="Buscar..." />
            </div>
          </div>
          <p v-if="!services" class="mt-4 text-center text-gray-400">
            Nenhum serviço até o momento
          </p>
          <div v-if="services" class="mt-4 divide-y border">
            <ServiceItem
              v-for="service in servicesFiltered"
              :key="service.id"
              :service="service"
              @getData="getData"
            />
          </div>
        </CardContent>
      </Card>
    </div>
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
import { ChevronLeft } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getServices } from "@/utils/services";
import ServiceItem from "@/components/dashboard/shop/home/service-item.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    ChevronLeft,
    Label,
    Input,
    Button,
    ServiceItem,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    servicesFiltered() {
      return this.services.filter((service) =>
        service.name.includes(this.search),
      );
    },
  },
  data() {
    return {
      services: [],
      loading: true,
      search: "",
    };
  },
  async mounted() {
    await this.getData();
    this.loading = false;
  },
  methods: {
    async getData() {
      this.services = await getServices({ shop_id: this.shop.id });
      console.log(this.services);
    },
  },
};
</script>
