<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div class="flex items-center gap-2">
      <div class="size-12">
        <img
          v-if="schedule.service.image"
          :src="schedule.service.image"
          class="size-12 rounded"
        />
        <div v-if="!schedule.service.image" class="size-12 rounded bg-gray-100" />
      </div>
      <div class="flex flex-col">
        <p class="text-xl font-semibold">{{ schedule.service.name }}</p>
        <p class="text-xs flex gap-4 items-center">
          <div>
          criado em {{ createdAtFormated }}
          </div>
          <div v-if="schedule.service.duration" class="flex gap-2 items-center">
            <Clock size="14" /> {{ schedule.service.duration }}min
          </div>
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2 md:flex-row">
      <p class="text-xl">{{ value }}</p>
      <div class="flex w-full justify-end gap-2">
        <Button size="sm" variant="outline" @click="updateAsDone">
          <ThumbsUp size="14" />
        </Button>
        <Button size="sm" variant="outline" @click="toggleArchive">
          <Loading v-if="loading" />
          <Trash size="14" v-if="!loading" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import { Edit, Trash, Clock, ThumbsUp } from "lucide-vue-next";
import { updateTimeSchedule } from "@/utils/time-schedule";
import Loading from "@/components/ui/loading.vue";
export default {
  components: {
    Edit,
    Trash,
    Button,
    Loading,
    Clock,
    ThumbsUp
  },
  props: {
    schedule: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    value() {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(this.schedule.service.value);
    },
    createdAtFormated() {
      return DateTime.fromJSDate(new Date(this.schedule.created_at)).toFormat(
        "dd/MM/yyyy",
      );
    },
  },
  emits: ["getData"],
  methods: {
    toggleArchive() {
      this.$store.commit("setDialog", {
        title: "Deseja arquivar este agendamento?",
        action: () => {
          this.loading = true;
          updateTimeSchedule({ id: this.schedule.id, data: { archived: true } });
          this.$emit("getData");
          this.loading = false;
        },
      });
    },
    updateAsDone() {
      this.$store.commit("setDialog", {
        title: "Deseja confirmar este agendamento?",
        action: () => {
          this.loading = true;
          updateTimeSchedule({ id: this.schedule.id, data: { done: true } });
          this.$emit("getData");
          this.loading = false;
        },
      });
    },
  },
};
</script>
