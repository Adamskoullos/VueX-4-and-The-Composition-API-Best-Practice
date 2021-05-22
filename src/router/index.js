import { createRouter, createWebHistory } from "vue-router";
import TodoOne from "../views/TodoOne.vue";
import TodoTwo from "../views/TodoTwo.vue";
import PageNotFound from "../views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    redirect: "/todo-one",
  },
  {
    path: "/todo-one",
    name: "TodoOne",
    component: TodoOne,
  },
  {
    path: "/todo-two",
    name: "TodoTwo",
    component: TodoTwo,
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
