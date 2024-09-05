<template>
  <div class="rounded sm:border sm:p-4">
    <div class="mb-4 flex items-center justify-between">
      <p class="text-xl">Clientes</p>
      <div>
        <Button as-child
          ><router-link :to="{ name: 'client-add' }"
            >Adicionar cliente</router-link
          ></Button
        >
      </div>
    </div>
    <Loading v-if="loading" />
    <div v-if="!loading && !clients" class="mt-4 text-center text-gray-400">
      Você ainda não tem nenhum cliente, crie um agora
    </div>
    <div v-if="clients" class="flex flex-col gap-2">
      <div class="divide-y border">
        <ClientItem
          v-for="client in clients"
          :key="client.id"
          :client="client"
          @getData="getData"
        />
      </div>
      <div v-if="count > 3" class="flex justify-center">
        <Button variant="link" as-child>
          <router-link :to="{ name: 'client-list' }"
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
import { getClients } from "@/utils/clients";
import ClientItem from "./client-item.vue";
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
    ClientItem,
  },
  data() {
    return {
      count: null,
      loading: true,
      clients: null,
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
      this.clients = await getClients();
      this.count = this.clients?.length;
      this.clients?.splice(3);
    },
  },
};
</script>
