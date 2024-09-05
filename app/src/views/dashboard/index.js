const routes = [
  {
    path: "/dashboard",
    component: () => import("@/layouts/dashboard.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/dashboard/dashboard.vue"),
      },
      {
        path: "shop/:id",
        component: () => import("@/views/dashboard/shop.vue"),
        children: [
          {
            path: "",
            name: "shop",
            component: () => import("@/views/dashboard/shop/home.vue"),
          },
          {
            path: "settings",
            name: "settings",
            component: () => import("@/views/dashboard/shop/settings.vue"),
          },
          {
            path: "service",
            component: () => import("@/views/dashboard/shop.vue"),
            children: [
              {
                path: "list",
                name: "service-list",
                component: () =>
                  import("@/views/dashboard/shop/service/list.vue"),
              },
              {
                path: "add",
                name: "service-add",
                component: () =>
                  import("@/views/dashboard/shop/service/form.vue"),
              },
              {
                path: ":service_id",
                name: "service-edit",
                component: () =>
                  import("@/views/dashboard/shop/service/form.vue"),
              },
            ],
          },
          {
            path: "client",
            component: () => import("@/views/dashboard/shop.vue"),
            children: [
              {
                path: "list",
                name: "client-list",
                component: () =>
                  import("@/views/dashboard/shop/client/list.vue"),
              },
              {
                path: "add",
                name: "client-add",
                component: () =>
                  import("@/views/dashboard/shop/client/form.vue"),
              },
              {
                path: ":client_id",
                name: "client-edit",
                component: () =>
                  import("@/views/dashboard/shop/client/form.vue"),
              },
            ],
          },
          {
            path: "team",
            component: () => import("@/views/dashboard/shop.vue"),
            children: [
              {
                path: "list",
                name: "team-list",
                component: () => import("@/views/dashboard/shop/team/list.vue"),
              },
              {
                path: "add",
                name: "team-add",
                component: () => import("@/views/dashboard/shop/team/form.vue"),
              },
              {
                path: ":member_id",
                name: "team-edit",
                component: () => import("@/views/dashboard/shop/team/form.vue"),
              },
            ],
          },
          {
            path: "time-schedule",
            name: "time-schedule",
            component: () => import("@/views/dashboard/shop/time-schedule.vue"),
          },
          {
            path: "order-list",
            name: "order-list",
            component: () => import("@/views/dashboard/shop/orders/list.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
