<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div class="flex items-center gap-2">
      <div class="size-12">
        <img
          v-if="service.image"
          :src="service.image"
          class="size-12 rounded"
        />
        <div v-if="!service.image" class="size-12 rounded bg-gray-100" />
      </div>
      <div class="flex flex-col">
        <p class="text-xl font-semibold">{{ service.name }}</p>
        <p class="text-xs flex gap-4 items-center">
          <div>
          criado em {{ createdAtFormated }}
          {{
            createdAtFormated !== updatedAtFormated
              ? `- atualizado em ${updatedAtFormated}`
              : ""
          }}
          </div>
          <div v-if="service.duration" class="flex gap-2 items-center">
            <Clock size="14" /> {{ service.duration }}min
          </div>
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2 md:flex-row">
      <p class="text-xl">{{ value }}</p>
      <div class="flex w-full justify-end gap-2">
        <Button size="sm" variant="outline" as-child>
          <router-link
            :to="{ name: 'service-edit', params: { service_id: service.id } }"
          >
            <Edit size="14" />
          </router-link>
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
import { Edit, Trash, Clock } from "lucide-vue-next";
import { updateService } from "@/utils/services";
import Loading from "@/components/ui/loading.vue";
export default {
  components: {
    Edit,
    Trash,
    Button,
    Loading,
    Clock,
  },
  props: {
    service: {
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
      }).format(this.service.value);
    },
    createdAtFormated() {
      return DateTime.fromJSDate(new Date(this.service.created_at)).toFormat(
        "dd/MM/yyyy",
      );
    },
    updatedAtFormated() {
      return DateTime.fromJSDate(new Date(this.service.updated_at)).toFormat(
        "dd/MM/yyyy",
      );
    },
  },
  emits: ["getData"],
  methods: {
    toggleArchive() {
      this.$store.commit("setDialog", {
        title: "Deseja arquivar este serviço?",
        action: () => {
          this.loading = true;
          updateService({ id: this.service.id, data: { archived: true } });
          this.$emit("getData");
          this.loading = false;
        },
      });
    },
  },
};
</script>
