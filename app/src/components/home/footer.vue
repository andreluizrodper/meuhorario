<template>
  <div class="section-wrapper spread-center text-xs">
    <span>Near Future Lab &copy; {{ year }}</span>
    <span>
      <Button variant="link" as-child>
        <router-link :to="{ name: 'privacy-policy' }">
          Politica de privacidade
        </router-link>
      </Button>

      &bull;
      <Button variant="link" as-child>
        <a href="mailto: andreluizrodper@gmail.com" class="text-xs"
          >Contato</a
        ></Button
      >
    </span>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";

export default {
  components: {
    Button,
  },
  computed: {
    year() {
      return DateTime.now().toFormat("yyyy");
    },
  },
};
</script>
