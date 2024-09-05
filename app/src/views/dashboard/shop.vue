<template>
  <Loading v-if="loading" />
  <RouterView v-if="!loading" />
</template>

<script>
import Loading from "@/components/ui/loading.vue";
import { RouterView } from "vue-router";
import { getShop } from "@/utils/shops";

export default {
  components: {
    Loading,
    RouterView,
  },
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    const shop = await getShop({ id: this.$route.params.id });
    this.$store.commit("setShop", shop);
    this.loading = false;
  },
};
</script>
