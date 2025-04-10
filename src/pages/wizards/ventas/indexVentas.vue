<template>
  <wizard-base
    wizard-type="ventas"
    :step-components="stepComponents"
    :sub-steps-config="subStepsConfig"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import WizardBase from "@/components/common/wizard-base.vue"
import personalData from "@/components/common/steps/personalData/personalData.vue"
import { getVentasSubStepsConfig } from "@/utils/wizard-imports"

// Definimos los componentes para cada paso principal
const stepComponents = {
  "personal-info": personalData,
  // Otros pasos principales que no tienen sub-pasos
}

// Obtenemos la configuración de sub-pasos para el wizard de ventas
const subStepsConfig = ref(getVentasSubStepsConfig())

</script>
