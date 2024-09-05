<template>
  <div class="w-full">
    <div class="mx-auto my-2 max-w-4xl">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <router-link :to="{ name: 'service-list' }">
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
            <div class="flex justify-between gap-4">
              <div class="flex w-full flex-1 flex-col gap-2">
                <Label>Nome</Label>
                <Input v-model="name" />
              </div>
              <div class="flex w-32 flex-col gap-2">
                <Label>Valor</Label>
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
            </div>
            <div class="flex justify-between gap-4">
              <div class="flex w-full flex-1 flex-col gap-2">
                <Label>Duração em minutos</Label>
                <Input suffix="min" v-model="duration" type="number" />
              </div>
              <div class="flex w-full flex-1 flex-col gap-2">
                <Label>Cobrar adiantado</Label>
                <Input suffix="%" v-model="prePay" type="number" />
              </div>
            </div>
            <div class="flex flex-col justify-between gap-2">
              <Label>Imagem</Label>
              <div class="flex flex-col gap-2">
                <div v-if="image">
                  <img :src="image" class="max-h-36" />
                </div>
                <div>
                  <Button class="relative flex gap-2 overflow-hidden">
                    <Upload size="14" />
                    <span>Selecionar arquivo</span>
                    <vueDropzone
                      ref="imgDropzone"
                      id="dropzone"
                      :options="dropzoneOptions"
                      @vdropzone-complete="afterComplete"
                      class="absolute opacity-0"
                    >
                      <template #default="{ files }">
                        <div class="dropzone">
                          <div class="dropzone__files">
                            <div
                              v-for="file in files"
                              :key="file.name"
                              class="dropzone__file"
                            >
                              <img
                                v-if="file.type.includes('image')"
                                :src="file.data"
                                class="dropzone__img"
                              />
                              <p>{{ file.name }}</p>
                            </div>
                          </div>
                        </div>
                      </template>
                    </vueDropzone>
                  </Button>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <Button variant="link" as-child>
                <router-link :to="{ name: 'service-list' }">
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
import vueDropzone from "dropzone-vue3";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload } from "lucide-vue-next";
import Currency from "@/components/ui/currency.vue";
import { createService, getService, updateService } from "@/utils/services";
import Loading from "@/components/ui/loading.vue";

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
    Upload,
    Currency,
    vueDropzone,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    title() {
      return this.$route.params.service_id
        ? "Editar serviço"
        : "Criando serviço";
    },
  },
  data() {
    return {
      loadingSave: false,
      loading: true,
      name: "",
      duration: "",
      value: "",
      prePay: "",
      image: "",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        useCustomSlot: true,
        addRemoveLinks: false,
        acceptedFiles: "image/*,application/pdf",
      },
    };
  },
  async mounted() {
    if (this.$route.params.service_id) {
      const service = await getService({ id: this.$route.params.service_id });
      this.name = service.name;
      this.prePay = service.prePay;
      this.duration = service.duration;
      this.value = service.value;
      this.image = service.image;
      this.loading = false;
    } else {
      this.loading = false;
    }
  },
  methods: {
    async afterComplete(file) {
      try {
        const storage = getStorage();
        const file_ext = file.name.split(".").pop();
        const imageName = uuidv4();
        this.storageRef = ref(
          storage,
          `${this.account.id}/image/services/${imageName}.${file_ext}`,
        );
        uploadBytes(this.storageRef, file).then(() => {
          getDownloadURL(this.storageRef).then((url) => {
            this.$refs.imgDropzone.removeFile(file);
            this.image = url;
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async save() {
      this.loadingSave = true;
      const data = {
        name: this.name,
        value: this.value,
        prePay: this.prePay,
        image: this.image,
        duration: this.duration,
        shop_id: this.shop.id,
      };
      if (this.$route.params.service_id) {
        await updateService({ data, id: this.$route.params.service_id });
      } else {
        await createService({ data });
      }
      this.loadingSave = false;
      this.$router.push({ name: "service-list" });
    },
  },
};
</script>
