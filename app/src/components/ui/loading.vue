<template>
  <div class="size-7 rounded-full border-[4px] border-gray-300">
    <LoaderCircle class="-m-1.5 animate-slow-spin" size="32" />
  </div>
</template>

<script>
import { LoaderCircle } from "lucide-vue-next";

export default {
  components: {
    LoaderCircle,
  },
  props: {
    size: {
      type: String,
    },
  },
  computed: {
    scale() {
      if (!this.size) return;
    },
  },
};
</script>
