import { markRaw, defineAsyncComponent } from "vue"
import type { Component } from "vue" // Modificado: Importamos Component como tipo

// Función para importar y marcar como raw todos los componentes comunes
export function getWizardComponents(): Record<string, Component> {
  // Modificado: Añadimos tipo de retorno
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
  const companyDespacho = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/sucursalPOS/companyDespacho.vue")),
  )
  const companyTuristico = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/sucursalPOS/companyTuristico.vue")),
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
  const configDocumentType = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configDocumentType.vue")),
  )
  const configParameterSearch = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configParameterSearch.vue")),
  )
  const configRipe = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configRipe.vue")),
  )
  const configRetencion = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configRetencion.vue")),
  )
  const configArtesano = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configArtesano.vue")),
  )
  const configLogo = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configLogo.vue")),
  )
  const impuestosManejar = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/impuestosManejar.vue")))

  const simpleQuestion = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/subSetupsSimple/simpleQuestion.vue")),
  )

  const simpleQuestionSucursal = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/subSetupsSimple/simpleQuestionSucursal.vue")),
  )

  // Devolvemos todos los componentes en un objeto
  return {
    companyInfo,
    companyDomain,
    companySucursal,
    companyDespacho,
    companyTuristico,
    companyPOS,
    companyPlanes,
    companyPagos,
    companyTicketEmail,
    configDocumentType,
    configParameterSearch,
    configRipe,
    configRetencion,
    configArtesano,
    configLogo,
    impuestosManejar,
    simpleQuestion,
    simpleQuestionSucursal,
  }
}

// Función para obtener la configuración de sub-pasos común
export function getCommonSubStepsConfig() {
  const components = getWizardComponents()

  // Modificado: Eliminamos los planes de la configuración común
  // ya que ahora se añadirán dinámicamente según la selección
  return {
    "create-company": [
      { title: "Información Básica", component: components.companyInfo },
      { title: "Email del ticket", component: components.companyTicketEmail },
      { title: "Establecer un Logo", component: components.configLogo },
      { title: "Dominio", component: components.companyDomain },
    ],
    "config-company": [
      { title: "Planes", component: components.companyPlanes },
      { title: "Tipo de Pagos", component: components.companyPagos },
      { title: "Configuracion de RIMPE", component: components.configRipe },
      { title: "Preguntas simples", component: components.simpleQuestion },
      { title: "Datos de la Sucursal", component: components.companySucursal },
      { title: "Preguntas simples Sucursal", component: components.simpleQuestionSucursal },
      { title: "Creacion de Punto de Venta", component: components.companyPOS },
    ],
    "sucursal-punto-venta-inicial": [
    ],
  }
}