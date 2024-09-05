<template>
  <div v-if="timeFrames" class="">
    <button
      @click="show = !show"
      class="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-50"
    >
      <p class="text-center text-base">{{ day.name }}</p>
      <ChevronDown v-if="!show" size="16" />
      <ChevronUp v-if="show" size="16" />
    </button>
    <div v-show="show" class="flex flex-col gap-2 py-2">
      <button
        v-for="(item, index) in availableSlots"
        :key="index"
        @click="pickSlot(item)"
        class="mx-2 w-full rounded border p-4 hover:bg-gray-50"
      >
        {{ item.time }}
      </button>
    </div>
  </div>
</template>

<script>
import { getTimeFramesByDay } from "@/utils/time-frame";
import { ChevronDown, ChevronUp } from "lucide-vue-next";

export default {
  components: {
    ChevronDown,
    ChevronUp,
  },
  props: {
    day: {
      type: Object,
    },
  },
  data() {
    return {
      timeFrames: null,
      show: false,
    };
  },
  computed: {
    service() {
      return this.$store.state.service;
    },
    availableSlots() {
      const slots = [];
      this.timeFrames.forEach((timeFrame) => {
        const limit = parseInt(timeFrame.end.timeValue.replace(":", ""));
        const duration = parseInt(this.service.duration);
        const available =
          limit - parseInt(timeFrame.start.timeValue.replace(":", ""));
        const availableSlots = Math.floor(available / duration);
        const items = new Array(availableSlots).keys();
        const [hours, minutes] = timeFrame.start.timeValue.split(":");
        const intHour = parseInt(hours);
        const intMinutes = parseInt(minutes);
        items.forEach((item) => {
          const addedMinutes = (duration * item + intMinutes) % 60;
          const addedHours = (duration * item + intMinutes) / 60;
          const addedEndMinutes =
            (duration * item + intMinutes + duration) % 60;
          const addedEndHours = (duration * item + intMinutes + duration) / 60;
          const slotHour = parseInt(addedHours + intHour);
          const slotMinute = parseInt(addedMinutes);
          const timeSlotStart = `${this.pad(slotHour)}:${this.pad(slotMinute)}`;
          const slotHourEnd = parseInt(addedEndHours + intHour);
          const slotMinuteEnd = parseInt(addedEndMinutes);
          const timeSlotEnd = `${this.pad(slotHourEnd)}:${this.pad(slotMinuteEnd)}`;
          const timeSlotEndInt = parseInt(timeSlotEnd.replace(":", ""));
          if (timeSlotEndInt < limit)
            slots.push({
              time: timeSlotStart,
            });
        });
      });
      return slots;
    },
  },
  async mounted() {
    this.getData();
  },
  methods: {
    pad(num) {
      return num < 10 ? "0" + num : num;
    },
    async getData() {
      this.timeFrames = await getTimeFramesByDay({ day: this.day.name });
    },
    pickSlot(slot) {
      this.$store.commit("setSlot", { slot: slot, day: this.day });
    },
  },
};
</script>
