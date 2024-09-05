<template>
  <div>
    <div class="flex justify-center">
      <Button @click="dialog = true" size="xs"
        >{{ timeFrame.start.timeValue }} - {{ timeFrame.end.timeValue }}</Button
      >
    </div>
    <Dialog :open="!!dialog" @update:open="toggleOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionando um intervalo de tempo</DialogTitle>
          <DialogDescription>
            Adicione o inicio e o final do intervalo que os seus serviços
            estarão disponiveis
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-6">
          <div class="flex justify-between gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label>Abertura</Label>
              <Select v-model="start">
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="(time, index) in timeFrameValues"
                      :key="index"
                      :value="time.key.toString()"
                      >{{ time.timeValue }}</SelectItem
                    >
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label>Fechamento</Label>
              <Select v-model="end" :disabled="!start">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="(time, index) in timeFrameValuesEnd"
                      :key="index"
                      :value="time.key.toString()"
                      >{{ time.timeValue }}</SelectItem
                    >
                  </SelectGroup>
                </SelectContent>
              </Select>
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
import { Plus } from "lucide-vue-next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default {
  components: {
    Label,
    Input,
    Button,
    Plus,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  },
  props: {
    day: {
      type: Object,
    },
  },
  props: {
    timeFrame: {
      type: Object,
    },
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    shop() {
      return this.$store.state.shop;
    },
    timeFrameValuesEnd() {
      return this.timeFrameValues.filter(
        (timeFrame) => timeFrame.key > parseInt(this.start),
      );
    },
  },
  watch: {
    start() {
      if (parseInt(this.start) > parseInt(this.end)) this.end = null;
    },
  },
  data() {
    const startTime = 0;
    const endTime = 24 * 60;
    const timeFrameValues = [];
    const pad = (num) => {
      return num < 10 ? "0" + num : num;
    };
    for (let minutes = startTime; minutes < endTime; minutes += 10) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      timeFrameValues.push({
        key: timeFrameValues.length,
        timeValue: `${pad(hours)}:${pad(mins)}`,
      });
    }
    return {
      start: this.timeFrame.start.key.toString(),
      end: this.timeFrame.end.key.toString(),
      dialog: false,
      timeFrameValues,
    };
  },
  emits: ["updateTimeFrame"],
  methods: {
    toggleOpen() {
      this.dialog = false;
    },
    async save() {
      const data = {
        day: this.day.name,
        start: this.timeFrameValues.find(
          (time) => time.key === parseInt(this.start),
        ),
        end: this.timeFrameValues.find(
          (time) => time.key === parseInt(this.end),
        ),
        shop_id: this.shop.id,
      };
      await updateTimeFrame({ data });
      this.$emit("updateTimeFrame");
      this.dialog = false;
    },
  },
};
</script>
