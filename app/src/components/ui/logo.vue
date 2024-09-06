<template>
  <div class="flex items-center gap-2">
    <span class="size-16 rounded-full bg-gray-100" />
    <div class="flex flex-col">
      <span class="leading-thight text-lg font-medium">Meu Horário</span>
      <span v-if="showTagLine" class="text-xs text-gray-700"
        >Controle a agenda do seu negócio, sem complicação</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showTagLine: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "h-16",
    },
  },
};
</script>
