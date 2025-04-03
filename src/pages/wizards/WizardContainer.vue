<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Wizard</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <div class="wizard-container">
          <!-- Barra de navegación de pasos -->
          <wizard-navigation />
          
          <!-- Aquí iría el contenido del paso actual -->
          <div class="step-content">
            <div v-if="currentStep" class="step-info-card">
              <h2>{{ currentStep.title }}</h2>
              <p v-if="currentStep.description">{{ currentStep.description }}</p>
              <p>
                <ion-badge color="primary" v-if="currentStep.isCommon">Paso Común</ion-badge>
                <ion-badge color="secondary" v-else>Paso Específico</ion-badge>
              </p>
              <p>Este es un contenedor para el paso actual. Aquí se renderizaría el contenido específico de cada paso.</p>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBadge } from '@ionic/vue';
  import WizardNavigation from '@/components/wizard/WizardNavigation.vue';
  import { useWizardStore } from '@/stores/wizardStore';
  
  const wizardStore = useWizardStore();
  
  // Obtener el paso actual
  const currentStep = computed(() => wizardStore.currentStep);
  </script>
  
  <style scoped>
  .wizard-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;
  }
  
  .step-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  
  .step-info-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
  }
  </style>
  
  