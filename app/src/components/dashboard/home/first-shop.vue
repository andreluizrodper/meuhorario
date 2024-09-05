<template>
  <div
    class="x-auto mx-auto my-2 flex max-w-lg flex-col gap-2 gap-4 rounded border p-4 shadow-sm"
  >
    <Data v-if="step === 0" @toggleStep="toggleStep" />
    <Services v-if="step === 1" @toggleStep="toggleStep" />
    <Schedule v-if="step === 2" @toggleStep="toggleStep" />
    <Done v-if="step === 3" @toggleStep="toggleStep" />
  </div>
</template>

<script>
import Data from "./data.vue";
import Services from "./services.vue";
import Schedule from "./schedule.vue";
import Done from "./done.vue";

export default {
  components: {
    Data,
    Services,
    Schedule,
    Done,
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    toggleStep(step) {
      this.step = step;
    },
  },
};
</script>
