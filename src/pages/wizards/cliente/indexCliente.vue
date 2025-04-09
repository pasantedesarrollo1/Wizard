<template>
  <wizard-base 
    wizard-type="cliente"
    :step-components="stepComponents"
    :sub-steps-config="subStepsConfig"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import WizardBase from "@/pages/wizards/common/wizard-base.vue"
import personalData from "@/pages/wizards/common/steps/personalData/personalData.vue"
import { getWizardComponents } from "@/utils/wizard-imports"

// Definimos los componentes para cada paso principal
const stepComponents = {
  "personal-info": personalData,
  // Otros pasos principales que no tienen sub-pasos
}

// Obtenemos los componentes del wizard
const components = getWizardComponents()

// Creamos una configuración personalizada para el cliente que excluye planes y método de pago
const subStepsConfig = ref({
  "create-company": [
    { title: "Información Básica", component: components.companyInfo },
    { title: "Establecer un Logo", component: components.configLogo },
  ],
  "config-company": [
      { title: "Consulta tu RUC", component: components.searchRUC },
      { title: "Configuraciones Generales", component: components.simpleQuestion },
      { title: "Email del ticket", component: components.companyTicketEmail },
  ],
})

</script>

