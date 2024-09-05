<template>
  <div class="flex w-full flex-col gap-2 rounded border px-1 py-4">
    <p class="text-center text-sm">{{ day.name }}</p>
    <p v-if="!timeFrames" class="text-center text-xs text-gray-500">Folga</p>
    <TimeSlot
      v-for="timeFrame in timeFrames"
      :key="timeFrame.id"
      :timeFrame="timeFrame"
    />
  </div>
</template>

<script>
import { getTimeFramesByDay } from "@/utils/time-frame";
import TimeSlot from "@/components/shop/time-frame-day-slot.vue";
export default {
  components: {
    TimeSlot,
  },
  props: {
    day: {
      type: Object,
    },
  },
  data() {
    return {
      timeFrames: null,
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.timeFrames = await getTimeFramesByDay({ day: this.day.name });
    },
  },
};
</script>
