<template>
  <div class="rounded sm:border sm:p-4">
    <div class="mb-4 flex items-center justify-between">
      <p class="text-xl">Agendamentos</p>
    </div>
    <Loading v-if="loading" />
    <div v-if="!loading && !orders" class="mt-4 text-center text-gray-400">
      Você ainda não tem nenhum agendamento, crie um agora
    </div>
    <div v-if="orders" class="flex flex-col gap-2">
      <div class="divide-y border">
        <ScheduledItem
          v-for="order in orders"
          :key="order.id"
          :schedule="order"
          @getData="getData"
        />
      </div>
      <div v-if="count > 3" class="flex justify-center">
        <Button variant="link" as-child>
          <router-link :to="{ name: 'order-list' }"
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
import { getTimeSchedules } from "@/utils/time-schedule";
import ScheduledItem from "./schedule-item.vue";
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
    ScheduledItem,
  },
  data() {
    return {
      count: null,
      loading: true,
      orders: null,
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
      this.orders = await getTimeSchedules();
      this.count = this.orders?.length;
      this.orders?.splice(3);
    },
  },
};
</script>
