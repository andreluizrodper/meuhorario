<template>
  <div class="flex flex-col gap-6">
    <p class="text-center">Criando o meu negócio</p>
    <div class="flex flex-col gap-2">
      <Label>Nome</Label>
      <Input v-model="name" />
    </div>
    <div class="flex flex-col gap-2">
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
    <div class="flex flex-col gap-2">
      <Label>Endereço</Label>
      <Input v-model="address" />
    </div>
    <div class="flex flex-col gap-2">
      <Label>CNPJ</Label>
      <Input v-model="cnpj" />
    </div>
    <div class="flex justify-center">
      <Button @click="save">Criar e ir para criação de serviços</Button>
    </div>
  </div>
</template>

<script>
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import vueDropzone from "dropzone-vue3";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload } from "lucide-vue-next";
import { createShop } from "@/utils/shops";

export default {
  components: {
    Label,
    Input,
    Button,
    Upload,
    vueDropzone,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  data() {
    return {
      name: "",
      cnpj: "",
      address: "",
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
  emits: ["toggleStep"],
  methods: {
    async afterComplete(file) {
      try {
        const storage = getStorage();
        const file_ext = file.name.split(".").pop();
        const imageName = uuidv4();
        this.storageRef = ref(
          storage,
          `${this.account.id}/logo/${imageName}.${file_ext}`,
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
      const data = {
        name: this.name,
        cnpj: this.cnpj,
        logo: this.logo,
        address: this.address,
      };
      const shop = createShop({ data });
      this.$store.commit("setShop", shop);
      this.$emit("toggleStep", 1);
    },
  },
};
</script>
