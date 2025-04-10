import { createRouter, createWebHistory } from "@ionic/vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/wizard/sales",
  },
  {
    path: "/wizard/general",
    component: () => import("@/pages/wizards/general/indexGeneral.vue")
  },
  {
    path: "/wizard/sales",
    component: () => import("@/pages/wizards/ventas/indexVentas.vue")
  },
  {
    path: "/wizard/support",
    component: () => import("@/pages/wizards/soporte/indexSoporte.vue")
  },
  {
    path: "/wizard/client",
    component: () => import("@/pages/wizards/cliente/indexCliente.vue")
  },
  {
    path: "/finished-company",
    component: () => import("@/components/common/finishedCompany.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router