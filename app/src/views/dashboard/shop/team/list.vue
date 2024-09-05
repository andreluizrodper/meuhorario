<template>
  <div class="w-full">
    <div class="mx-auto my-2 max-w-4xl">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <router-link :to="{ name: 'shop' }">
              <ChevronLeft />
            </router-link>
            <div class="flex flex-1 flex-col gap-2">
              <CardTitle>Equipe</CardTitle>
              <CardDescription>{{ shop.name }}</CardDescription>
            </div>
            <div>
              <Button as-child>
                <router-link :to="{ name: 'team-add' }">
                  Adicionar membro
                </router-link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex justify-end">
            <div>
              <Input v-model="search" placeholder="Buscar..." />
            </div>
          </div>
          <p v-if="!members" class="mt-4 text-center text-gray-400">
            Nenhum membro na sua equipe até o momento
          </p>
          <div v-if="members" class="mt-4 divide-y border">
            <MemberItem
              v-for="member in membersFiltered"
              :key="member.id"
              :member="member"
              @getData="getData"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script>
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getTeamMembers } from "@/utils/team";
import MemberItem from "@/components/dashboard/shop/home/team-item.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    ChevronLeft,
    Label,
    Input,
    Button,
    MemberItem,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    membersFiltered() {
      return this.members.filter((member) => member.name.includes(this.search));
    },
  },
  data() {
    return {
      members: null,
      loading: true,
      search: "",
    };
  },
  async mounted() {
    await this.getData();
    this.loading = false;
  },
  methods: {
    async getData() {
      this.members = await getTeamMembers();
    },
  },
};
</script>
