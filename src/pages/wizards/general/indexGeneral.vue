<template>
  <wizard-base
    wizard-type="general"
    :step-components="stepComponents"
    :sub-steps-config="subStepsConfig"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import WizardBase from "@/pages/wizards/common/wizard-base.vue";
import personalData from "@/pages/wizards/common/steps/personalData/personalData.vue";
import { getCommonSubStepsConfig } from "@/utils/wizard-imports";

// Definimos los componentes para cada paso principal
const stepComponents = {
  "personal-info": personalData,
  // Otros pasos principales que no tienen sub-pasos
};

// Obtenemos la configuración común de sub-pasos
const subStepsConfig = ref(getCommonSubStepsConfig());
</script>
