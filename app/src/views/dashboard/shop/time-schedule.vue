<template>
  <RouterView />
  <div class="w-full">
    <div class="mx-auto my-2 max-w-4xl">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <router-link :to="{ name: 'shop' }">
              <ChevronLeft />
            </router-link>
            <div class="flex flex-1 flex-col gap-2">
              <CardTitle>Meus horários</CardTitle>
              <CardDescription>{{ shop.name }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            class="grid w-full grid-cols-2 flex-col gap-1 md:grid-cols-3 lg:grid-cols-7"
          >
            <Day v-for="(day, index) in days" :key="index" :day="day" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script>
import { ChevronLeft } from "lucide-vue-next";
import Loading from "@/components/ui/loading.vue";
import Day from "@/components/dashboard/shop/time-schedule/day.vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default {
  components: {
    ChevronLeft,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    Loading,
    CardContent,
    Day,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
  },
  data() {
    return {
      loading: true,
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
