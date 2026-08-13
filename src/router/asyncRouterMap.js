export default [
  {
    //考勤页面
    path: "/attendance",
    name: "attendance",
    component: () => import("../views/authViews/Attendance.vue"),
    meta: ["boss", "manager"],
  },
  {
    // 工资页面
    path: "/salary",
    name: "salary",
    component: () => import("../views/authViews/Salary.vue"),
    meta: ["boss"],
  },
];
