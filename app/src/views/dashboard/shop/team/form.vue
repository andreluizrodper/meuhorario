<template>
  <div class="w-full">
    <div class="mx-auto my-2 max-w-4xl">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <router-link :to="{ name: 'team-list' }">
              <ChevronLeft />
            </router-link>
            <div class="flex flex-col gap-2">
              <CardTitle>{{ title }}</CardTitle>
              <CardDescription>{{ shop.name }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Loading v-if="loading" />
          <div v-if="!loading" class="flex flex-col gap-6">
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>Nome</Label>
              <Input v-model="name" />
            </div>
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>Telefone</Label>
              <Input v-model="phone" v-mask="`(##) #####-####`" />
            </div>
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>Email</Label>
              <Input v-model="email" />
            </div>
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>Valor diária</Label>
              <Currency
                v-model="value"
                :options="{
                  locale: 'pt-BR',
                  currency: 'BRL',
                  currencyDisplay: 'symbol',
                  hideCurrencySymbolOnFocus: true,
                  hideGroupingSeparatorOnFocus: true,
                  hideNegligibleDecimalDigitsOnFocus: true,
                  autoDecimalDigits: false,
                  useGrouping: true,
                  accountingSign: false,
                }"
              />
            </div>
            <div class="flex items-center justify-between">
              <Button variant="link" as-child>
                <router-link :to="{ name: 'team-list' }">
                  Cancelar
                </router-link>
              </Button>
              <Loading v-if="loadingSave" />
              <Button v-if="!loadingSave" @click="save">Salvar</Button>
            </div>
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
import {
  createTeamMember,
  getTeamMember,
  updateTeamMember,
} from "@/utils/team";
import Loading from "@/components/ui/loading.vue";
import { mask } from "vue-the-mask";
import Currency from "@/components/ui/currency.vue";

export default {
  components: {
    Loading,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    ChevronLeft,
    Label,
    Input,
    Button,
    Currency,
  },
  directives: { mask },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    title() {
      return this.$route.params.service_id
        ? "Editar membro da equipe"
        : "Criando membro da equipe";
    },
  },
  data() {
    return {
      loadingSave: false,
      loading: true,
      name: "",
      phone: "",
      email: "",
      value: "",
    };
  },
  async mounted() {
    if (this.$route.params.member_id) {
      const teamMember = await getTeamMember({
        id: this.$route.params.member_id,
      });
      this.name = teamMember.name;
      this.phone = teamMember.phone;
      this.email = teamMember.email;
      this.value = teamMember.value;
      this.loading = false;
    } else {
      this.loading = false;
    }
  },
  methods: {
    async save() {
      this.loadingSave = true;
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        value: this.value,
        shop_id: this.shop.id,
      };
      if (this.$route.params.member_id) {
        await updateTeamMember({ data, id: this.$route.params.member_id });
      } else {
        await createTeamMember({ data });
      }
      this.loadingSave = false;
      this.$router.push({ name: "team-list" });
    },
  },
};
</script>
