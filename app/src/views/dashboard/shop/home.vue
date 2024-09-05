<template>
  <RouterView />
  <div class="w-full">
    <div class="mx-auto my-2 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>{{ shop.name }}</CardTitle>
          <div class="flex items-center gap-4">
            <Button as-child variant="link" size="sm">
              <router-link :to="{ name: 'settings' }" class="flex gap-2">
                Meu perfil
              </router-link>
            </Button>
            <Button variant="link" as-child size="sm">
              <router-link
                :to="{ name: 'front-shop', params: { uuid: shop.id } }"
                >Ver minha loja</router-link
              >
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-4">
            <CardOrders />
            <TimeSchedule />
            <CardServices />
            <CardClients />
            <CardTeamMembers />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/ui/loading.vue";
import CardServices from "@/components/dashboard/shop/home/services.vue";
import CardClients from "@/components/dashboard/shop/home/clients.vue";
import CardTeamMembers from "@/components/dashboard/shop/home/team.vue";
import TimeSchedule from "@/components/dashboard/shop/home/time-schedule.vue";
import CardOrders from "@/components/dashboard/shop/home/orders.vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default {
  components: {
    Button,
    CardOrders,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardTeamMembers,
    Loading,
    CardServices,
    CardContent,
    CardClients,
    TimeSchedule,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>
