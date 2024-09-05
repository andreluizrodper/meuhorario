<template>
  <html v-if="campaign" v-html="campaign.template" />
</template>

<script>
import { getCampaign } from "@/utils/campaigns";

export default {
  data() {
    return {
      campaign: null,
    };
  },
  async mounted() {
    this.campaign = await getCampaign({ id: this.$route.params.id });
  },
};
</script>
