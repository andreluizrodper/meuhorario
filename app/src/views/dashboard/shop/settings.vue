<template>
  <RouterView />
  <div class="w-full">
    <div class="mx-auto my-2 max-w-4xl">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <router-link :to="{ name: 'shop' }">
              <ChevronLeft />
            </router-link>
            <div class="flex flex-1 flex-col gap-2">
              <CardTitle>Meu perfil</CardTitle>
              <CardDescription>{{ shop.name }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between gap-4">
              <div class="flex w-full flex-1 flex-col gap-2">
                <Label>Nome</Label>
                <Input v-model="name" />
              </div>
            </div>
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>Endereço</Label>
              <Input v-model="address" />
            </div>
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>Telefone</Label>
              <Input v-model="phone" v-mask="'(##) #####-####'" />
            </div>
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>CNPJ</Label>
              <Input v-model="cnpj" v-mask="'##.###.###/####-##'" />
            </div>
            <div class="flex w-full flex-1 flex-col gap-2">
              <Label>Bio</Label>
              <Textarea v-model="bio" />
            </div>
            <div class="flex flex-col justify-between gap-2">
              <Label>Logo</Label>
              <div class="flex flex-col gap-2">
                <div v-if="logo">
                  <img :src="logo" class="max-h-36" />
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
                <router-link :to="{ name: 'shop' }"> Cancelar </router-link>
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import vueDropzone from "dropzone-vue3";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload } from "lucide-vue-next";
import { updateShop, getShop } from "@/utils/shops";
import Loading from "@/components/ui/loading.vue";
import { mask } from "vue-the-mask";

export default {
  components: {
    Loading,
    Textarea,
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
    vueDropzone,
  },
  directives: { mask },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
  },
  data() {
    return {
      loadingSave: false,
      loading: true,
      name: "",
      address: "",
      cnpj: "",
      phone: "",
      bio: "",
      logo: "",
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
    this.name = this.shop.name;
    this.address = this.shop.address;
    this.cnpj = this.shop.cnpj;
    this.phone = this.shop.phone;
    this.logo = this.shop.logo;
    this.bio = this.shop.bio;
  },
  methods: {
    async afterComplete(file) {
      try {
        const storage = getStorage();
        const file_ext = file.name.split(".").pop();
        const imageName = uuidv4();
        this.storageRef = ref(
          storage,
          `${this.account.id}/${imageName}.${file_ext}`,
        );
        uploadBytes(this.storageRef, file).then(() => {
          getDownloadURL(this.storageRef).then((url) => {
            this.$refs.imgDropzone.removeFile(file);
            this.logo = url;
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
        address: this.address,
        phone: this.phone,
        cnpj: this.cnpj,
        logo: this.logo,
        bio: this.bio,
      };
      await updateShop({ data, id: this.shop.id });
      const shop = await getShop({ id: this.shop.id });
      this.$store.commit("setShop", shop);
      this.loadingSave = false;
      this.$router.push({ name: "shop" });
    },
  },
};
</script>
