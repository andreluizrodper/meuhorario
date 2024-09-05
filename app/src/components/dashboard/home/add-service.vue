<template>
  <div>
    <div>
      <Button @click="dialog = true">Adicionar serviço</Button>
    </div>
    <Dialog :open="!!dialog" @update:open="toggleOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criando um serviço</DialogTitle>
          <DialogDescription>
            Adicione os serviços que você presta
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-6">
          <div class="flex justify-between gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label>Nome</Label>
              <Input v-model="name" />
            </div>
            <div class="flex flex-col gap-2">
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
          <div class="flex justify-center">
            <Button @click="save">Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import vueDropzone from "dropzone-vue3";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload } from "lucide-vue-next";
import Currency from "@/components/ui/currency.vue";
import { createService } from "@/utils/services";

export default {
  components: {
    Label,
    Input,
    Button,
    Upload,
    vueDropzone,
    Currency,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    shop() {
      return this.$store.state.shop;
    },
  },
  data() {
    return {
      name: "",
      value: "",
      image: "",
      dialog: false,
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
  emits: ["updateServices"],
  methods: {
    toggleOpen() {
      this.dialog = false;
    },
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
      const data = {
        name: this.name,
        value: this.value,
        image: this.image,
        shop_id: this.shop.id,
      };
      await createService({ data });
      this.$emit("updateServices");
      this.dialog = false;
    },
  },
};
</script>
