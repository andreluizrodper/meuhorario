<template>
  <div class="mx-auto max-w-5xl px-4 py-2">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <img v-if="shop.logo" :src="shop.logo" />
          <span v-if="!shop.logo" class="size-12 rounded bg-gray-200" />
          <p class="text-xl">{{ shop.name }}</p>
        </div>
        <div class="flex flex-col gap-4 md:flex-row md:items-center">
          <div class="flex items-center gap-2">
            <MapPin size="16" /> {{ shop.address }}
          </div>
          <div v-if="shop.phone" class="flex items-center gap-2">
            <Phone size="16" /> {{ shop.phone }}
          </div>
        </div>
        <div v-if="shop.bio" class="text-base">
          {{ shop.bio }}
        </div>
      </div>
      <ShopServices />
      <TimeFrames />
    </div>
    <Footer />
  </div>
</template>

<script>
import ShopServices from "@/components/shop/services.vue";
import TimeFrames from "@/components/shop/time-frames.vue";
import { MapPin, Phone } from "lucide-vue-next";
import Footer from "@/components/shop/footer.vue";
export default {
  components: {
    MapPin,
    Phone,
    ShopServices,
    TimeFrames,
    Footer,
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
  },
};
</script>
