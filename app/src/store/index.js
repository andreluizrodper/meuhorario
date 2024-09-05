import { createStore } from "vuex";
import { toasts, toastFunctions } from "@/components/ui/toast/store";

export default createStore({
  state: {
    toasts,
    user: {},
    account: null,
    dialog: null,
    phone: null,
    shop: null,
    service: null,
    slot: null,
    confirm: null,
    hasPin: false,
  },
  mutations: {
    ...toastFunctions,
    setDialog(state, data) {
      state.dialog = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    setAccount(state, data) {
      state.account = data;
    },
    setPhone(state, data) {
      state.phone = data;
    },
    setShop(state, data) {
      state.shop = data;
    },
    setService(state, data) {
      state.service = data;
    },
    setHasPin(state, data) {
      state.hasPin = data;
    },
    setSlot(state, data) {
      state.slot = data;
    },
    setConfirm(state, data) {
      state.confirm = data;
    },
  },
});
