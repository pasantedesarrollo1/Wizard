import { markRaw, defineAsyncComponent } from "vue";
import type { Component } from "vue";

// Función para importar y marcar como raw todos los componentes comunes
export function getWizardComponents(): Record<string, Component> {
  // Componentes comunes
  const companyInfo = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/createCompany/sub-step1/indexCreateCompanySS1.vue"
        )
    )
  );

  const companyDomain = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/createCompany/sub-step2/components/companyDomain.vue"
        )
    )
  );
  const companySucursal = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/createCompany/sub-step1/components/companySucursal.vue"
        )
    )
  );

  const companyPOS = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/createCompany/sub-step1/components/companyPOS.vue"
        )
    )
  );

  const companyPlanes = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/dataSales/sub-step1/indexSalesDataSS1.vue"
        )
    )
  );

  const companyPagos = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/dataSales/sub-step2/components/companyPagos.vue"
        )
    )
  );
  const companyTicketEmail = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/configurationCompany/sub-step3/indexConfiCompanySS3.vue"
        )
    )
  );

  const configLogo = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/createCompany/sub-step2/indexCreateCompanySS2.vue"
        )
    )
  );

  const simpleQuestion = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/configurationCompany/sub-step2/indexConfiCompanySS2.vue"
        )
    )
  );

  const searchRUC = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/configurationCompany/sub-step1/indexConfigCompanySS1.vue"
        )
    )
  );
  const consultorVentas = markRaw(
    defineAsyncComponent(
      () =>
        import(
          "@/components/common/steps/dataSales/sub-step2/indexSalesDataSS2.vue"
        )
    )
  );

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
    consultorVentas,
  };
}

// Función para obtener la configuración de sub-pasos común
export function getCommonSubStepsConfig() {
  const components = getWizardComponents();

  return {
    "create-company": [
      { title: "Información Básica", component: components.companyInfo },
      { title: "Establecer un Logo", component: components.configLogo },
      { title: "Dominio", component: components.companyDomain },
      {
        title: "Sucursal - Creacion sucursal",
        component: components.companySucursal,
      },
      {
        title: "Sucursal - Creacion de Punto de Venta",
        component: components.companyPOS,
      },
    ],
    "config-company": [
      { title: "Consulta tu RUC", component: components.searchRUC },
      {
        title: "Configuraciones Generales",
        component: components.simpleQuestion,
      },
      { title: "Email del ticket", component: components.companyTicketEmail },
    ],
    "data-sales": [
      { title: "Planes - Tipo de Planes", component: components.companyPlanes },
      { title: "datos de la venta", component: components.consultorVentas },
    ],
  };
}
