<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Wizard de Cliente</IonTitle>
      </IonToolbar>
    </IonHeader>
    
    <IonContent>
      <div class="ion-padding">
        <!-- Barra de progreso siempre visible -->
        <ProgressBar :steps="steps" :currentStep="currentStep" />
        
        <!-- Contenido condicional -->
        <div class="ion-padding-top">
          <welcomeCliente v-if="currentStep === 0" />
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
import ProgressBar from "@/components/common/progressBar.vue";
import welcomeCliente from "@/components/wizard/cliente/welcomeCliente.vue";
import personalData from "@/pages/wizards/common/personalData.vue";
import { useWizardProgress } from "@/composables/useWizardProgress";

const { steps, currentStep } = useWizardProgress("cliente");

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};
</script>