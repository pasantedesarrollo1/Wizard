import { createRouter, createWebHistory } from "@ionic/vue-router"
import type { RouteRecordRaw } from "vue-router"
import { useWizardStore } from "@/stores/wizardStore"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/wizard/sales",
  },
  {
    path: "/wizard/sales",
    component: () => import("@/pages/wizards/ventas/indexVentas.vue"),
    beforeEnter: (to, from, next) => {
      const wizardStore = useWizardStore()
      wizardStore.updateWizardState({ type: "sales" })
      // Mostrar el estado completo, no solo formData
      console.log("Wizard state actualizado:", {
        wizardState: wizardStore.getCurrentWizardState,
        formData: wizardStore.getAllFormData
      })
      next()
    }
  },
  {
    path: "/wizard/support",
    component: () => import("@/pages/wizards/soporte/indexSoporte.vue"),
    beforeEnter: (to, from, next) => {
      const wizardStore = useWizardStore()
      wizardStore.updateWizardState({ type: "support" })
      // Mostrar el estado completo, no solo formData
      console.log("Wizard state actualizado:", {
        wizardState: wizardStore.getCurrentWizardState,
        formData: wizardStore.getAllFormData
      })
      next()
    }
  },
  {
    path: "/wizard/client",
    component: () => import("@/pages/wizards/cliente/indexCliente.vue"),
    beforeEnter: (to, from, next) => {
      const wizardStore = useWizardStore()
      wizardStore.updateWizardState({ type: "client" })
      // Mostrar el estado completo, no solo formData
      console.log("Wizard state actualizado:", {
        wizardState: wizardStore.getCurrentWizardState,
        formData: wizardStore.getAllFormData
      })
      next()
    }
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