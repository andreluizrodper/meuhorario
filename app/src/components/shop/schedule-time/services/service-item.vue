<template>
  <button
    @click="selectService"
    class="flex w-full items-center justify-between px-4 py-2"
  >
    <div class="flex items-center gap-2">
      <div class="size-12">
        <img
          v-if="service.image"
          :src="service.image"
          class="size-12 rounded"
        />
        <div v-if="!service.image" class="size-12 rounded bg-gray-100" />
      </div>
      <div class="flex flex-col">
        <p class="text-left text-xl font-semibold">{{ service.name }}</p>
        <div v-if="service.duration" class="flex items-center gap-2">
          <Clock size="16" /> {{ service.duration }}min
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2 md:flex-row">
      <p class="text-xl">{{ value }}</p>
    </div>
  </button>
</template>

<script>
import { Clock } from "lucide-vue-next";
export default {
  components: {
    Clock,
  },
  props: {
    service: {
      type: Object,
    },
  },
  computed: {
    value() {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(this.service.value);
    },
  },
  methods: {
    selectService() {
      this.$store.commit("setService", this.service);
    },
  },
};
</script>
