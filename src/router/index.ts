import { createRouter, createWebHistory } from "@ionic/vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/wizard/ventas",
  },
  {
    path: "/wizard/ventas",
    component: () => import("@/pages/wizards/ventas/indexVentas.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router