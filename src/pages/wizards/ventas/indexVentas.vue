<template>
  <wizard-base
    wizard-type="ventas"
    :step-components="stepComponents"
    :sub-steps-config="subStepsConfig"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import WizardBase from "@/components/common/wizard-base.vue";
import personalData from "@/components/common/steps/personalData/personalData.vue";
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
      { title: "create-company SS1", component: components.indexCreateCompanySS1 },
      { title: "create-company SS2", component: components.indexCreateCompanySS2 },
    ],
    "config-company": [
      { title: "config-comapny SS1", component: components.indexConfigCompanySS1 },
      {title: "config-comapny SS2",component: components.indexConfiCompanySS2,},
      { title: "config-comapny SS3", component: components.indexConfiCompanySS3 },
    ],
    "data-sales": [
      { title: "data-sales SS1", component: components.indexSalesDataSS1 },
      { title: "data-sales SS2", component: components.indexSalesDataSS2 },
    ],
});
</script>
