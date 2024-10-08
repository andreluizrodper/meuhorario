<template>
  <div class="grid gap-6">
    <form @submit.prevent="doLogin">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <Label class="sr-only" for="phone"> Telefone </Label>
          <Input
            v-model="phone"
            id="phone"
            placeholder="Seu telefone"
            type="text"
            :disabled="loading"
            v-mask="`(##) #####-####`"
          />
        </div>
        <Button id="sign-in-button" :disabled="loading" variant="purple">
          <LoaderCircle v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          Entrar
        </Button>
      </div>
    </form>
    <div class="flex justify-center">
      <div id="recaptcha-container" />
    </div>
    <hr />
    <div class="flex justify-center">
      <Button @click="doLoginGoogle" variant="outline">
        <span class="flex items-center justify-center gap-4">
          <LoaderCircle
            v-if="loadingGoogle"
            class="mr-2 h-4 w-4 animate-spin"
          />
          <img
            v-if="!loadingGoogle"
            src="@/assets/google.png"
            class="w-[24px]"
          />
          Entrar com Google
        </span>
      </Button>
    </div>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-vue-next";
import Loading from "@/components/ui/loading.vue";
import { loginAccount, createAccount, accountExists } from "@/utils/account.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
} from "firebase/auth";
import { mask } from "vue-the-mask";
import { auth } from "@/utils/firebase.js";

export default {
  components: {
    Button,
    Input,
    Label,
    LoaderCircle,
    Loading,
  },
  directives: { mask },
  data() {
    return {
      phone: "",
      loading: false,
      loadingGoogle: false,
      error: false,
      message: "",
      signPossible: false,
      recaptchaVerifier: null,
    };
  },
  mounted() {
    this.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container");
    this.signPossible = true;
  },
  methods: {
    doLoginGoogle() {
      this.loadingGoogle = true;
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (result) => {
        const doAccountExists = await accountExists({ owner: result.user.uid });
        if (!doAccountExists) {
          const data = {
            name: result.user.displayName,
            email: result.user.email,
            owner: result.user.uid,
          };
          await createAccount({ data });
        }
        await loginAccount({ id: result.user.uid });
        this.loadingGoogle = false;
        this.$router.push({ name: "dashboard" });
      });
    },
    doLogin() {
      this.loading = true;
      this.error = false;
      this.message = "";
      this.$store.commit("setNumber", this.phone);
      const phone = this.phone.replace(/[ |(|)|-]/g, "");
      signInWithPhoneNumber(auth, `+55${phone}`, this.recaptchaVerifier)
        .then((confirmationResult) => {
          this.$router.push({
            name: "pin",
            params: { code: confirmationResult.verificationId },
          });
        })
        .catch((error) => {
          this.loading = false;
          this.$store.commit("addToast", {
            description:
              "Não conseguimos enviar o código agora, tente novamente mais tarde.",
          });
          this.error = true;
          this.loading = false;
        });
    },
  },
};
</script>
@/utils/account.js
