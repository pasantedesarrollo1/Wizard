<template>
  <wizard-base
    wizard-type="ventas"
    :step-components="stepComponents"
    :sub-steps-config="subStepsConfig"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import WizardBase from "@/pages/wizards/common/wizard-base.vue";
import personalData from "@/pages/wizards/common/steps/personalData/personalData.vue";
import { getWizardComponents } from "@/utils/wizard-imports";

// Obtenemos los componentes del wizard
const components = getWizardComponents();

// Definimos los componentes para cada paso principal
const stepComponents = {
  "personal-info": personalData,
  // Otros pasos principales que no tienen sub-pasos
};

// Creamos una configuración personalizada para el cliente que excluye planes y método de pago
const subStepsConfig = ref({
  "create-company": [
    { title: "Información Básica", component: components.companyInfo },
    { title: "Establecer un Logo", component: components.configLogo },
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
});
</script>
