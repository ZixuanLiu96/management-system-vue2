// 导航守卫专属文件
import router from ".";

router.beforeEach((to, from, next) => {
  const hasToken = sessionStorage.getItem("token");
  // 用本地存储的token判断登录状态，如果有token，想去登录页，不让去，保持在主页，想去其他页面都放行
  if (hasToken) {
    if (to.path == "/login") {
      next("/");
    } else {
      next();
    }
    //如果没有token，表示是未登录状态，想去登录页，可以放行，当去其他页面，都重定向到登录页
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  }
});
