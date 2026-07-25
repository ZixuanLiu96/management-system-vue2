const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../views/Layout.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

export default routes;
