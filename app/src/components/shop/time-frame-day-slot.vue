<template>
  <div class="flex w-full flex-col gap-2 px-1 py-4 text-center">
    das {{ timeFrame.start.timeValue }} <br />
    até {{ timeFrame.end.timeValue }}
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    timeFrame: {
      type: Object,
    },
  },
};
</script>
