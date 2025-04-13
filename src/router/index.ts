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
      // Actualizamos type, currentStep y currentSubStep
      wizardStore.updateWizardState({ 
        type: "sales",
        currentStep: "data-sales", // Este es el primer paso para el wizard de ventas
        currentSubStep: 1 // Inicializamos en el primer sub-paso (1-indexed como se usa en el componente)
      })
      // Mostrar el estado completo en consola
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
      // Actualizamos type, currentStep y currentSubStep
      wizardStore.updateWizardState({ 
        type: "support",
        currentStep: "personal-info", // Este es el primer paso para el wizard de soporte
        currentSubStep: 1 // Inicializamos en el primer sub-paso
      })
      // Mostrar el estado completo en consola
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
      // Actualizamos type, currentStep y currentSubStep
      wizardStore.updateWizardState({ 
        type: "client",
        currentStep: "personal-info", // Este es el primer paso para el wizard de cliente
        currentSubStep: 1 // Inicializamos en el primer sub-paso
      })
      // Mostrar el estado completo en consola
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