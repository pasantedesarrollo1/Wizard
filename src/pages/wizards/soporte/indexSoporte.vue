<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Wizard de Soporte</IonTitle>
      </IonToolbar>
    </IonHeader>
    
    <IonContent>
      <div class="ion-padding">
        <!-- Barra de progreso siempre visible -->
        <progressBar :steps="steps" :currentStep="currentStep" />
        
        <!-- Contenido condicional -->
        <div class="ion-padding-top">
          <welcomeSoporte v-if="currentStep === 0" />
          <personalData v-else-if="currentStep === 1" />
        </div>
        
        <!-- Botón de navegación -->
        <div class="ion-padding-top">
          <IonButton expand="block" @click="nextStep">Siguiente</IonButton>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import progressBar from "@/components/common/progressBar.vue";
import welcomeSoporte from "@/components/wizard/soporte/welcomeSoporte.vue"; 
import personalData from "@/pages/wizards/common/personalData.vue";
import { useWizardProgress } from "@/composables/useWizardProgress";

const { steps, currentStep } = useWizardProgress("soporte");

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};
</script>