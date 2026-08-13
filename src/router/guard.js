// 导航守卫专属文件
import router from ".";
import asyncRoutes from "./asyncRouterMap";
import store from "../store/index";

router.beforeEach(async (to, from, next) => {
  const hasToken = sessionStorage.getItem("token");
  // 用本地存储的token判断登录状态，如果有token，想去登录页，不让去，保持在主页，想去其他页面都放行
  if (hasToken) {
    await store.dispatch("getRole");
    if (to.path == "/login") {
      next("/");
    } else {
      // 动态添加路由 router.addRoute(路由配置项)
      if (to.name == null) {
        const routes = asyncRoutes.filter((item) =>
          item.meta.auth.includes(store.state.role),
        );
        routes.forEach((item) => router.addRoute("layout", item));
        console.log(routes);
        next({ ...to, replace: true });
      } else {
        next();
      }
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
