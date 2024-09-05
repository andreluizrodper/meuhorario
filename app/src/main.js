import { createApp } from "vue";
import "@/assets/index.css";
import App from "@/app.vue";
import router from "@/router/app.js";
import store from "@/store";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv18wjiVjGJnL5V8lhvqoJCtLXrLlVpv0",
  authDomain: "mail-monster-a7281.firebaseapp.com",
  projectId: "mail-monster-a7281",
  appId: "1:561599795733:web:2ffa77c81cfeb2118d341c",
  measurementId: "G-M8EZY9QRTQ",
};

const firebase = initializeApp(firebaseConfig);

getAuth(firebase);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
