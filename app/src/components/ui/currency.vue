<template>
  <Input ref="inputRef" type="text" />
</template>

<script>
import { Input } from "@/components/ui/input";
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  components: {
    Input,
  },
  props: {
    modelValue: Number, // Vue 2: value
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);

    return { inputRef };
  },
};
</script>
