<template>
  <div class="rounded sm:border sm:p-4">
    <div class="mb-4 flex items-center justify-between">
      <p class="text-xl">Meus horários</p>
      <div>
        <Button as-child
          ><router-link :to="{ name: 'time-schedule' }"
            >Organizar horários</router-link
          ></Button
        >
      </div>
    </div>
    <Loading v-if="loading" />
    <div class="flex items-center gap-2">
      <span v-if="status" class="text-green-500">Loja aberta!</span>
      <span v-if="!status" class="text-red-500">Loja fechada</span>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/ui/loading.vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTimeFramesByDay } from "@/utils/time-frame";
import { DateTime } from "luxon";

export default {
  components: {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Loading,
  },
  data() {
    const days = [
      { name: "Domingo" },
      { name: "Segunda Feira" },
      { name: "Terça Feira" },
      { name: "Quarta Feira" },
      { name: "Quinta Feira" },
      { name: "Sexta Feira" },
      { name: "Sabado" },
    ];
    return {
      loading: true,
      day: days[new Date().getDay()],
      now: parseInt(DateTime.now().toFormat("hhmm")),
      timeFrames: null,
      status: null,
    };
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
  },
  async mounted() {
    await this.getData();
    this.loading = false;
  },
  methods: {
    async getData() {
      this.timeFrames = await getTimeFramesByDay({ day: this.day.name });
      this.status = !!this.timeFrames?.find(
        (timeFrame) =>
          this.now < parseInt(timeFrame.end.timeValue.replace(":", "")) &&
          this.now > parseInt(timeFrame.start.timeValue.replace(":", "")),
      );
    },
  },
};
</script>
