export default [
  {
    //考勤页面
    path: "/attendance",
    name: "attendance",
    component: () => import("../views/authViews/Attendance.vue"),
    meta: { auth: ["boss", "manager"] },
  },
  {
    // 工资页面
    path: "/salary",
    name: "salary",
    component: () => import("../views/authViews/Salary.vue"),
    meta: { auth: ["boss"] },
  },
  {
    path: "*",
    name: "not_found",
    component: () => import("../views/NotFound.vue"),
    meta: { auth: ["boss", "manager", "user"] },
  },
];
