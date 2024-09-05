<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="text-center">
      Você recebeu um código no número {{ phone }}, insira o código abaixo.
    </div>
    <PinInput
      id="pin-input"
      v-model="value"
      placeholder="-"
      @complete="handleComplete"
    >
      <PinInputGroup>
        <PinInputInput v-for="(id, index) in 6" :key="id" :index="index" />
      </PinInputGroup>
    </PinInput>
    <Loading v-if="loading" />
    <Button variant="link" @Click="goBack"> Solicitar um novo código </Button>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-vue-next";
import Loading from "@/components/ui/loading.vue";
import { loginAccount, createAccount, accountExists } from "@/utils/account.js";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/utils/firebase.js";
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";

export default {
  components: {
    Button,
    Input,
    Label,
    LoaderCircle,
    Loading,
    PinInput,
    PinInputGroup,
    PinInputInput,
  },
  data() {
    return {
      value: [],
      loading: false,
      error: false,
      message: "",
    };
  },
  computed: {
    phone() {
      return this.$store.state.phone;
    },
  },
  methods: {
    goBack() {
      this.$store.commit("setHasPin", false);
    },
    handleComplete() {
      this.loading = true;
      var credential = PhoneAuthProvider.credential(
        this.$route.params.code,
        this.value.join(""),
      );
      signInWithCredential(auth, credential)
        .then(async (result) => {
          const doAccountExists = await accountExists({
            owner: result.user.uid,
          });
          if (!doAccountExists) {
            const data = {
              phone: this.phone,
            };
            await createAccount({ data });
          }
          await loginAccount({ id: result.user.uid });
          this.goBack();
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$store.commit("addToast", {
            description: "Código inválido, solicite um código novo.",
          });
          this.error = true;
          this.loading = false;
        });
    },
  },
};
</script>
@/utils/account.js
