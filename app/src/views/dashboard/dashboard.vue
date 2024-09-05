<template>
  <div class="w-full">
    <Loading v-if="loading" />
    <FirstShop v-if="!loading && !shops" />
    <div v-if="shops" class="mx-auto flex max-w-xl flex-col gap-2">
      <p class="text-xl">Meu negócio</p>
      <ShopItem v-for="shop in shops" :key="shop.id" :shop="shop" />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/ui/loading.vue";
import FirstShop from "@/components/dashboard/home/first-shop.vue";
import { getShops } from "@/utils/shops";
import ShopItem from "@/components/dashboard/home/shop-item.vue";

export default {
  components: {
    Loading,
    FirstShop,
    ShopItem,
  },
  data() {
    return {
      shops: null,
      loading: true,
    };
  },
  async mounted() {
    this.shops = await getShops();
    this.loading = false;
  },
};
</script>
