<template>
  <wizard-base 
    wizard-type="ventas"
    :step-components="stepComponents"
    :sub-steps-config="subStepsConfig"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WizardBase from "@/components/wizard/wizard-base.vue";
import personalData from "@/pages/wizards/common/personalData.vue";
import consultorVentas from "@/components/wizard/ventas/consultorVentas.vue";
import { getCommonSubStepsConfig } from "@/utils/wizard-imports";

// Definimos los componentes para cada paso principal
const stepComponents = {
  'consultor': consultorVentas,
  'personal-info': personalData,
  // Otros pasos principales que no tienen sub-pasos
};

// Obtenemos la configuración común de sub-pasos
const subStepsConfig = ref(getCommonSubStepsConfig());
</script>

