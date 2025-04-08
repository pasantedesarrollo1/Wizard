<template>
  <wizard-base 
    wizard-type="cliente"
    :step-components="stepComponents"
    :sub-steps-config="subStepsConfig"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import WizardBase from "@/components/wizard/wizard-base.vue"
import personalData from "@/pages/wizards/common/personalData.vue"
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
    { title: "Email del ticket", component: components.companyTicketEmail },
    { title: "Establecer un Logo", component: components.configLogo },
    { title: "Dominio", component: components.companyDomain },
  ],
  "config-company": [
    // Se omiten los sub-setups 1 (planes) y 2 (método de pago)
    { title: "Configuracion de RIMPE", component: components.configRipe },
    { title: "Preguntas simples", component: components.simpleQuestion },
    { title: "Datos de la Sucursal", component: components.companySucursal },
    { title: "Preguntas simples Sucursal", component: components.simpleQuestionSucursal },
    { title: "Creacion de Punto de Venta", component: components.companyPOS },
  ],
})

</script>

