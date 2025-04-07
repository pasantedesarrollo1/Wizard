import { markRaw, defineAsyncComponent } from "vue"
import type { Component } from "vue" // Modificado: Importamos Component como tipo

// Función para importar y marcar como raw todos los componentes comunes
export function getWizardComponents(): Record<string, Component> {
  // Modificado: Añadimos tipo de retorno
  // Componentes comunes
  const companyInfo = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyInfo.vue")),
  )
  const companyContact = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyContact.vue")),
  )
  const companyType = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyType.vue")),
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
  const companyPOS = markRaw(defineAsyncComponent(() => import("@/pages/wizards/common/sucursalPOS/companyPOS.vue")))
  const companyPlanComercios = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyPlanComercios.vue")),
  )
  const companyPlanRestaurantes = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyPlanRestaurantes.vue")),
  )
  const companyFrecuencia = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyFrecuencia.vue")),
  )
  const companyPagos = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyPagos.vue")),
  )
  const companyTicketEmail = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/createCompany/companyTicketEmail.vue")),
  )
  const configRecivos = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configRecivos.vue")),
  )
  const configDocumentType = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configDocumentType.vue")),
  )
  const configDocumentDefault = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configDocumentDefault.vue")),
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
  const configInventario = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configInventario.vue")),
  )
  const configLogo = markRaw(
    defineAsyncComponent(() => import("@/pages/wizards/common/configuracionCompany/configLogo.vue")),
  )
  const impuestosManejar = markRaw(defineAsyncComponent(() => import("@/pages/wizards/common/impuestosManejar.vue")))

  // Devolvemos todos los componentes en un objeto
  return {
    companyInfo,
    companyContact,
    companyType,
    companyDomain,
    companySucursal,
    companyDespacho,
    companyTuristico,
    companyPOS,
    companyPlanComercios,
    companyPlanRestaurantes,
    companyFrecuencia,
    companyPagos,
    companyTicketEmail,
    configRecivos,
    configDocumentType,
    configDocumentDefault,
    configParameterSearch,
    configRipe,
    configRetencion,
    configArtesano,
    configInventario,
    configLogo,
    impuestosManejar,
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
      { title: "Tipo de Emprendimiento", component: components.companyType },
      { title: "Frecuencia de Pago", component: components.companyFrecuencia },
      { title: "Tipo de Pagos", component: components.companyPagos },
      { title: "Email del ticket", component: components.companyTicketEmail },
      { title: "Dominio", component: components.companyDomain },
      { title: "Datos de Contacto", component: components.companyContact },
      { title: "Establecer un Logo", component: components.configLogo },
    ],
    "config-company": [
      { title: "Configuracion de Recibos", component: components.configRecivos },
      { title: "Configuracion de Tipo de Documento", component: components.configDocumentType },
      { title: "Configuracion de Documento por Defecto", component: components.configDocumentDefault },
      { title: "Configuracion del Parametro de busqueda", component: components.configParameterSearch },
      { title: "Configuracion de RIPE", component: components.configRipe },
      { title: "Configuracion de Agente de retencion", component: components.configRetencion },
      { title: "Configuracion de Artesano", component: components.configArtesano },
      { title: "Configuracion de Control de Inventario", component: components.configInventario },
      { title: "Configuracion de Impuestos a Manejar", component: components.impuestosManejar },
    ],
    "sucursal-punto-venta-inicial": [
      { title: "Datos de la Sucursal", component: components.companySucursal },
      { title: "Establecer Despacho", component: components.companyDespacho },
      { title: "Tipo de Establecimiento", component: components.companyTuristico },
      { title: "Creacion de Punto de Venta", component: components.companyPOS },
    ],
  }
}