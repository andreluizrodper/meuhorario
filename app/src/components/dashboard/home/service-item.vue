<template>
  <div class="flex gap-4">
    <img :src="service.image" class="size-24" />
    <p class="text-xl">
      {{ service.name }}
    </p>
    <p>
      {{ service.value }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
    },
  },
};
</script>
