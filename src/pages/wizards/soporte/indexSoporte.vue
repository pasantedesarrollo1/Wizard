<template>
  <IonPage>
    <IonContent class="ion-content">
          <!-- Pantalla de bienvenida (se muestra primero) -->
          <welcomeGeneral v-if="!started" @start="handleStart" />
      <!-- Contenido principal del wizard (se muestra después de hacer clic en "Comenzar") -->
  <div v-else class="wizard-container">
    <ProgressBar 
      :steps="steps" 
      :current-step="currentStep" 
      :show-title="true"
      @update:current-step="updateStep"
    />
    
    <!-- Contenedor del contenido -->
    <div class="wizard-content">
      <welcomeSoporte v-if="currentStep === 0" />
      <personalData v-else-if="currentStep === 1" />
      <!-- Otros componentes para pasos adicionales -->
    </div>
    
    <!-- Botones de navegación -->
    <div class="navigation-controls">
      <IonButton fill="outline" @click="prevStep" :disabled="currentStep === 0">
        Anterior
      </IonButton>
      <IonButton @click="nextStep" :disabled="currentStep === steps.length - 1">
        {{ currentStep === steps.length - 2 ? 'Completar' : 'Siguiente' }}
      </IonButton>
    </div>
  </div>
</IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import ProgressBar from "@/components/common/progressBar.vue";
import welcomeGeneral from "@/components/wizard/general/welcomeGeneral.vue"; 
import personalData from "@/pages/wizards/common/personalData.vue";
import { useWizardProgress } from "@/composables/useWizardProgress";

const { steps, currentStep, nextStep, prevStep, goToStep } = useWizardProgress("soporte");

const updateStep = (step: number) => {
  goToStep(step);
};

const started = ref(false);

// Función para manejar el evento de inicio desde welcomeGeneral
const handleStart = () => {
  started.value = true;
};
</script>

<style scoped>
.ion-content {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Asegura que ocupe toda la pantalla */
}

.wizard-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Permite que crezca */
  height: 100%; /* Asegura que ocupe toda la altura disponible */
}

.wizard-content {
  flex-grow: 1; /* Hace que el contenido ocupe el espacio restante */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Cambiado de center a flex-start para que el contenido empiece desde arriba */
  padding: 20px;
  overflow-y: auto; /* Permite scroll si el contenido es muy grande */
}

.navigation-controls {
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 7;
  padding-bottom: 7;
  background: white;
  position: sticky; /* Cambiado de static a sticky */
  bottom: 0; /* Fija al fondo */
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); /* Añade una sombra sutil para separar visualmente */
  z-index: 10; /* Asegura que esté por encima de otros elementos */
}

.ion-content {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Asegura que ocupe toda la pantalla */
}

</style>