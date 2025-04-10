<template>
  <ion-page>
    <ion-content>
      <wizard-base
        wizard-type="soporte"
        :step-components="stepComponents"
        :sub-steps-config="subStepsConfig"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonPage, IonContent } from '@ionic/vue';
import WizardBase from "@/components/common/wizard-base.vue";
import personalData from "@/components/common/steps/personalData/personalData.vue";
import { getSoporteSubStepsConfig } from "@/utils/wizard-imports";

// Definimos los componentes para cada paso principal
const stepComponents = {
  "personal-info": personalData,
  // Otros pasos principales que no tienen sub-pasos
};

// Obtenemos la configuración de sub-pasos para el wizard de soporte
const subStepsConfig = ref(getSoporteSubStepsConfig());
</script>

<style scoped>
/* Estilos específicos para la página del wizard de soporte */
ion-content {
  --background: #f5f7fa;
}
</style>