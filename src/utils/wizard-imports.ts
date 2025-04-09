import { markRaw, defineAsyncComponent } from "vue"
import type { Component } from "vue"

// Función para importar y marcar como raw todos los componentes comunes
export function getWizardComponents(): Record<string, Component> {
  // Componentes comunes
  const companyInfo = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyInfo.vue")),
  )

  const companyDomain = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyDomain.vue")),
  )
  const companySucursal = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/sucursalPOS/companySucursal.vue")),
  )

  const companyPOS = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/sucursalPOS/companyPOS.vue")),
  )
  
  const companyPlanes = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyPlanes.vue")),
  )

  const companyPagos = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyPagos.vue")),
  )
  const companyTicketEmail = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyTicketEmail.vue")),
  )

  const configLogo = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configLogo.vue")),
  )

  const simpleQuestion = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/subSetupsSimple/simpleQuestion.vue")),
  )

  const searchRUC = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/searchRuc.vue")),
  )
  const consultorVentas = markRaw(
    defineAsyncComponent(() => import("@/components/wizard/ventas/consultorVentas.vue")),
  )




  // Devolvemos todos los componentes en un objeto
  return {
    companyInfo,
    companyDomain,
    companySucursal,
    companyPOS,
    companyPlanes,
    companyPagos,
    companyTicketEmail,
    configLogo,
    simpleQuestion,
    searchRUC,
    consultorVentas
  }
}

// Función para obtener la configuración de sub-pasos común
export function getCommonSubStepsConfig() {
  const components = getWizardComponents()

  return {
    "create-company": [
      { title: "Información Básica", component: components.companyInfo },
      { title: "Establecer un Logo", component: components.configLogo },
      { title: "Dominio", component: components.companyDomain },
      { title: "Sucursal - Creacion sucursal", component: components.companySucursal },
      { title: "Sucursal - Creacion de Punto de Venta", component: components.companyPOS },
    ],
    "config-company": [
      { title: "Consulta tu RUC", component: components.searchRUC },
      { title: "Configuraciones Generales", component: components.simpleQuestion },
      { title: "Email del ticket", component: components.companyTicketEmail },
    ],
    "data-sales": [
      { title: "Planes - Tipo de Planes", component: components.companyPlanes },
      { title: "datos de la venta", component: components.consultorVentas },
    ],
  }
}