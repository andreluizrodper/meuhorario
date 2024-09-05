<template>
  <div class="flex flex-col gap-2 rounded border p-3">
    <p class="text-xl">
      {{ shop.name }}<br />
      <span class="text-xs text-gray-600">({{ shop.id }})</span>
    </p>
    <p class="text-sm">{{ shop.address }}</p>
    <div>
      <Button @click="goToShop"> Ver o meu negócio </Button>
    </div>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
export default {
  components: {
    Button,
  },
  props: {
    shop: {
      type: Object,
    },
  },
  methods: {
    goToShop() {
      this.$store.commit("setShop", this.shop);
      this.$router.push({ name: "shop", params: { id: this.shop.id } });
    },
  },
};
</script>
