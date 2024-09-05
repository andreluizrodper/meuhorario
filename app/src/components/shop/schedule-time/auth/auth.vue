<template>
  <SmsForm v-if="!hasPin" />
  <SmsPin v-if="hasPin" />
</template>

<script>
import SmsForm from "./sms-form.vue";
import SmsPin from "./sms-pin.vue";

export default {
  components: {
    SmsForm,
    SmsPin,
  },
  computed: {
    hasPin() {
      return this.$store.state.hasPin;
    },
  },
};
</script>
