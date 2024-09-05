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
              <CardTitle>Agendamentos</CardTitle>
              <CardDescription>{{ shop.name }}</CardDescription>
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
          <p v-if="!orders" class="mt-4 text-center text-gray-400">
            Nenhum agendamento até o momento
          </p>
          <div v-if="orders" class="mt-4 divide-y border">
            <ScheduledItem
              v-for="order in ordersFiltered"
              :key="order.id"
              :schedule="order"
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
import { getTimeSchedules } from "@/utils/time-schedule";
import ScheduledItem from "@/components/dashboard/shop/home/schedule-item.vue";

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
    ScheduledItem,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    ordersFiltered() {
      return this.orders.filter((order) =>
        order.service.name.includes(this.search),
      );
    },
  },
  data() {
    return {
      orders: [],
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
      this.orders = await getTimeSchedules({ shop_id: this.shop.id });
    },
  },
};
</script>
