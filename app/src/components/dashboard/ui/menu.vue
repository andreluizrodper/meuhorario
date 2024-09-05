<template>
  <div class="flex gap-3 sm:flex-col">
    <router-link
      class="left m-0 w-full rounded-l border border-transparent p-0 px-3 text-base text-gray-600 hover:bg-gray-200 hover:text-gray-900"
      v-for="(item, index) in items"
      :key="index"
      :to="item.to"
      :exact-active-class="item.exactActiveClass"
      :active-class="item.activeClass"
    >
      {{ item.text }}
    </router-link>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
export default {
  components: {
    Button,
  },
  data() {
    return {
      items: [
        {
          text: "Meu negócio",
          to: { name: "dashboard" },
          exactActiveClass: "bg-gray-50 text-gray-900",
        },
      ],
    };
  },
};
</script>
