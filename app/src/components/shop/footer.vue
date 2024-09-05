<template>
  <div class="flex justify-between py-6 text-xs text-gray-500">
    <span class="text-xs text-gray-500">{{ year }} &copy;NearFutureLab</span>
    <div class="flex gap-4">
      <span>Politica de privacidade</span>
      &bull;
      <a href="mailto:andreluizrodper@gmail.com">Contato</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>
