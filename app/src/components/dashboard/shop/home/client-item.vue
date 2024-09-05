<template>
  <div class="flex items-center justify-between gap-4 px-4 py-2">
    <div
      class="flex flex-1 flex-col justify-start gap-4 md:flex-row md:items-center"
    >
      <div class="flex flex-1 flex-col">
        <p class="text-xl font-semibold">{{ client.name }}</p>
        <p class="text-xs">
          criado em {{ createdAtFormated }}
          {{
            createdAtFormated !== updatedAtFormated
              ? `- atualizado em ${updatedAtFormated}`
              : ""
          }}
        </p>
      </div>
      <p class="text-base">
        <span class="text-xl font-semibold">
          {{ client.phone }}
        </span>
        <br />
        {{ client.email }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-2 md:flex-row">
      <div class="flex w-full justify-end gap-2">
        <Button size="sm" variant="outline" as-child>
          <router-link
            :to="{ name: 'client-edit', params: { client_id: client.id } }"
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
import { Edit, Trash } from "lucide-vue-next";
import { updateClient } from "@/utils/clients";
import Loading from "@/components/ui/loading.vue";

export default {
  components: {
    Edit,
    Trash,
    Button,
    Loading,
  },
  props: {
    client: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    createdAtFormated() {
      return DateTime.fromJSDate(new Date(this.client.created_at)).toFormat(
        "dd/MM/yyyy",
      );
    },
    updatedAtFormated() {
      return DateTime.fromJSDate(new Date(this.client.updated_at)).toFormat(
        "dd/MM/yyyy",
      );
    },
  },
  emits: ["getData"],
  methods: {
    toggleArchive() {
      this.$store.commit("setDialog", {
        title: "Deseja arquivar este cliente?",
        action: () => {
          this.loading = true;
          updateClient({ id: this.client.id, data: { archived: true } });
          this.$emit("getData");
          this.loading = false;
        },
      });
    },
  },
};
</script>
