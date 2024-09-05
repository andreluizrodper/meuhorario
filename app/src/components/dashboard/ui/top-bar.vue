<template>
  <div class="flex items-center justify-between p-4">
    <h1 class="flex gap-2 text-base">
      {{ greetings }}, {{ account && account.name }}
      <Skeleton v-if="!account" class="h-6 w-[50px]" />
    </h1>
    <div></div>
  </div>
</template>

<script>
import { Skeleton } from "@/components/ui/skeleton";
import DatePicker from "@/components/ui/date-picker.vue";
import { DateTime } from "luxon";

export default {
  components: {
    Skeleton,
    DatePicker,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    greetings() {
      const hours = new Date().getHours();
      if (hours < 12) return "Bom dia";
      if (hours < 18) return "Boa tarde";
      return "Boa noite";
    },
  },
  data() {
    return {
      dateStart: DateTime.now().startOf("week").toJSDate(),
      dateEnd: DateTime.now().endOf("week").toJSDate(),
    };
  },
  methods: {
    updateDates({ start, end }) {
      this.dateStart = start.toJSDate();
      this.dateEnd = end.toJSDate();
    },
  },
};
</script>
