<template>
  <div class="rounded sm:border sm:p-4">
    <div class="mb-4 flex items-center justify-between">
      <p class="text-xl">Equipe</p>
      <div>
        <Button as-child
          ><router-link :to="{ name: 'team-add' }"
            >Adicionar membro</router-link
          ></Button
        >
      </div>
    </div>
    <Loading v-if="loading" />
    <div v-if="!loading && !teamMembers" class="mt-4 text-center text-gray-400">
      Você ainda não tem nenhum membro na sua equipe, crie um agora
    </div>
    <div v-if="teamMembers" class="flex flex-col gap-2">
      <div class="divide-y border">
        <TeamItem
          v-for="member in teamMembers"
          :key="member.id"
          :member="member"
          @getData="getData"
        />
      </div>
      <div v-if="count > 3" class="flex justify-center">
        <Button variant="link" as-child>
          <router-link :to="{ name: 'team-list' }"
            >Ver todos ({{ count }})</router-link
          >
        </Button>
      </div>
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
import { getTeamMembers } from "@/utils/team";
import TeamItem from "./team-item.vue";
import { Button } from "@/components/ui/button";

export default {
  components: {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Loading,
    TeamItem,
  },
  data() {
    return {
      count: null,
      loading: true,
      teamMembers: null,
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
      this.teamMembers = await getTeamMembers();
      this.count = this.teamMembers?.length;
      this.teamMembers?.splice(3);
    },
  },
};
</script>
