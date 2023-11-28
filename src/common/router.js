import { createRouter, createWebHashHistory } from "vue-router";
import { AdminStore } from "../stores/AdminStore";


let routes = [
  { path: "/", name: "home", component: () => import("@/views/HomePage.vue") },
  { path: "/articles", name: "articles", component: () => import("@/views/ArticlePage.vue") },
  {
    path: "/sendmsg",
    name: "sendmsg",
    component: () => import("@/views/Sendmsg.vue"),
  },
  {
    path: "/check199",
    name: "check199",
    component: () => import("@/views/Check199.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/views/Detail.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: (to, from, next) => {
      if (from.name === "article") {
        next({ name: "home" });
      }
      next();
    },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    redirect: "/dashboard/user",
    component: () => import("@/views/dashboard/Dashboard.vue"),
    children: [
      {
        path: "/dashboard/user",
        name: "user",
        meta: { is_root: true },
        component: () => import("@/views/dashboard/Users.vue"),
      },
      {
        path: "/dashboard/category",
        name: "category",
        meta: { is_root: true },
        component: () => import("@/views/dashboard/Category.vue"),
      },
      {
        path: "/dashboard/article",
        name: "article",
        meta: { is_root: true },
        component: () => import("@/views/dashboard/Article.vue"),
      },
      {
        path: "/dashboard/setmessage",
        name: "setmessage",
        meta: { is_root: true },
        component: () => import("@/views/dashboard/setMessage.vue"),
      },
      {
        path: "/dashboard/otherset",
        name: "otherset",
        meta: { is_root: true },
        component: () => import("@/views/dashboard/AdminSet.vue"),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const adminStore = AdminStore();
  if (to.matched.some((record) => record.meta.is_root)) {
    if (adminStore.token) {
      next();
    } else {
      console.log("请先登录");
      next({ name: "login" });
    }
  } else {
    next();
  }
});



export { router, routes };
