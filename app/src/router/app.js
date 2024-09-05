import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/home.vue";
import PrivacyPolicy from "@/views/privacy-policy.vue";
import auth from "@/views/auth";
import dashboard from "@/views/dashboard";
import shop from "@/views/shop";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/privacy-policy", name: "privacy-policy", component: PrivacyPolicy },
  ...auth,
  ...dashboard,
  ...shop,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
