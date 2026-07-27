const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../views/Layout.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/index/Home.vue"),
      },
      {
        path: "/personal",
        name: "personal",
        component: () => import("../views/personal/index.vue"),
      },
      {
        path: "/orders/list",
        name: "order_list",
        component: () => import("../views/orders/OrdersList.vue"),
        //将面包屑菜单写在这，便于之后集中渲染
        meta: { bread: ["订单管理", "订单列表"] },
      },
      {
        path: "/waybill/list",
        name: "waybill_list",
        component: () => import("../views/waybill/WayBillList.vue"),
        //将面包屑菜单写在这，便于之后集中渲染
        meta: { bread: ["运单管理", "运单列表"] },
      },
      {
        path: "/waybill/in",
        name: "waybill_in",
        component: () => import("../views/waybill/WayBillIn.vue"),
        //将面包屑菜单写在这，便于之后集中渲染
        meta: { bread: ["运单管理", "运单录入"] },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

export default routes;
