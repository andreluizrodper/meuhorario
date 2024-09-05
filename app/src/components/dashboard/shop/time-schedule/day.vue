<template>
  <div class="flex w-full flex-col gap-2 rounded border px-1 py-4">
    <p class="text-center text-sm">{{ day.name }}</p>
    <p v-if="!timeFrames" class="text-center text-xs text-gray-500">
      Nenhum horário até o momento
    </p>
    <EditTimeFrame
      v-for="timeFrame in timeFrames"
      :key="timeFrame.id"
      :timeFrame="timeFrame"
    />
    <AddTimeFrame @updateTimeFrame="getData" :day="day" />
  </div>
</template>

<script>
import AddTimeFrame from "./add-time-frame.vue";
import EditTimeFrame from "./edit-time-frame.vue";
import { getTimeFramesByDay } from "@/utils/time-frame";
export default {
  components: {
    AddTimeFrame,
    EditTimeFrame,
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
