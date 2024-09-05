<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div class="flex flex-1 items-center gap-2">
      <div class="flex flex-col">
        <p class="text-xl font-semibold">{{ member.name }}</p>
        <p class="text-xs">
          criado em {{ createdAtFormated }}
          {{
            createdAtFormated !== updatedAtFormated
              ? `- atualizado em ${updatedAtFormated}`
              : ""
          }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-col items-end gap-2 sm:items-center md:flex-row md:gap-4"
    >
      <p class="text-nowrap text-base">{{ member.phone }}</p>
      <p class="text-xl">{{ value }}</p>
      <div class="flex w-full justify-end gap-2">
        <Button size="sm" variant="outline" as-child>
          <router-link
            :to="{ name: 'team-edit', params: { member_id: member.id } }"
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
import { updateTeamMember } from "@/utils/team";
import Loading from "@/components/ui/loading.vue";
export default {
  components: {
    Edit,
    Trash,
    Button,
    Loading,
  },
  props: {
    member: {
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
      }).format(this.member.value);
    },
    createdAtFormated() {
      return DateTime.fromJSDate(new Date(this.member.created_at)).toFormat(
        "dd/MM/yyyy",
      );
    },
    updatedAtFormated() {
      return DateTime.fromJSDate(new Date(this.member.updated_at)).toFormat(
        "dd/MM/yyyy",
      );
    },
  },
  emits: ["getData"],
  methods: {
    toggleArchive() {
      this.$store.commit("setDialog", {
        title: "Deseja arquivar este member?",
        action: () => {
          this.loading = true;
          updateTeamMember({ id: this.member.id, data: { archived: true } });
          this.$emit("getData");
          this.loading = false;
        },
      });
    },
  },
};
</script>
