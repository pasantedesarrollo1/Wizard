import { createRouter, createWebHistory } from "@ionic/vue-router"
import type { RouteRecordRaw } from "vue-router"
import WizardContainer from "@/pages/wizards/WizardContainer.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/wizard",
  },
  {
    path: "/wizard",
    name: "Wizard",
    component: WizardContainer,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

