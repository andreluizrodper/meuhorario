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
              <CardTitle>Clientes</CardTitle>
              <CardDescription>{{ shop.name }}</CardDescription>
            </div>
            <div>
              <Button as-child>
                <router-link :to="{ name: 'client-add' }">
                  Adicionar cliente
                </router-link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex justify-end">
            <div>
              <Input v-model="search" placeholder="Buscar..." />
            </div>
          </div>
          <p v-if="!clients" class="mt-4 text-center text-gray-400">
            Nenhum cliente até o momento
          </p>
          <div v-if="clients" class="mt-4 divide-y border">
            <ClientItem
              v-for="client in clientsFiltered"
              :key="client.id"
              :client="client"
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
import { getClients } from "@/utils/clients";
import ClientItem from "@/components/dashboard/shop/home/client-item.vue";

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
    ClientItem,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    clientsFiltered() {
      return this.clients.filter((client) => client.name.includes(this.search));
    },
  },
  data() {
    return {
      clients: null,
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
      this.clients = await getClients({ shop_id: this.shop.id });
    },
  },
};
</script>
