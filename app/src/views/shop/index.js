const routes = [
  {
    path: "/:uuid",
    component: () => import("@/layouts/shop.vue"),
    children: [
      {
        path: "",
        name: "front-shop",
        component: () => import("@/views/shop/home.vue"),
      },
      {
        path: "schedule-time",
        name: "schedule-time",
        component: () => import("@/views/shop/schedule-time.vue"),
      },
    ],
  },
];

export default routes;
