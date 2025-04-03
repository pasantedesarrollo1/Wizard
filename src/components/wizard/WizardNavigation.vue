<template>
    <div class="wizard-navigation">
      <!-- Selector de Wizard -->
      <ion-segment v-model="selectedWizardId" @ion-change="handleWizardChange">
        <ion-segment-button v-for="wizard in wizards" :key="wizard.id" :value="wizard.id">
          <ion-label>{{ wizard.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>
  
      <!-- Barra de Navegación de Pasos -->
      <div class="steps-container">
        <div class="steps-wrapper">
          <div 
            v-for="(step, index) in wizardSteps" 
            :key="step.id" 
            class="step-item"
            :class="{
              'active': index === currentStepIndex,
              'completed': index < currentStepIndex,
              'common': step.isCommon
            }"
            @click="goToStep(index)"
          >
            <div class="step-icon">
              <ion-icon :icon="step.icon"></ion-icon>
            </div>
            <div class="step-info">
              <div class="step-title">{{ step.title }}</div>
              <div v-if="step.description" class="step-description">{{ step.description }}</div>
            </div>
            <div class="step-connector" v-if="index < wizardSteps.length - 1"></div>
          </div>
        </div>
      </div>
  
      <!-- Botones de Navegación -->
      <div class="navigation-buttons">
        <ion-button 
          fill="outline" 
          :disabled="currentStepIndex === 0"
          @click="prevStep"
        >
          <ion-icon slot="start" :icon="arrowBackOutline"></ion-icon>
          Anterior
        </ion-button>
        
        <ion-button 
          :disabled="currentStepIndex === wizardSteps.length - 1"
          @click="nextStep"
        >
          Siguiente
          <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
        </ion-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { IonSegment, IonSegmentButton, IonLabel, IonButton, IonIcon } from '@ionic/vue';
  import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
  import { useWizardStore } from '@/stores/wizardStore';
  
  // Inicializamos el store
  const wizardStore = useWizardStore();
  
  // Referencia reactiva para el wizard seleccionado
  const selectedWizardId = ref('');
  
  // Computados para acceder a los datos del store
  const wizards = computed(() => wizardStore.wizards);
  const wizardSteps = computed(() => wizardStore.activeWizardSteps);
  const currentStepIndex = computed(() => {
    const activeWizard = wizardStore.activeWizard;
    return activeWizard ? activeWizard.currentStepIndex : 0;
  });
  
  // Métodos para manejar la navegación
  const handleWizardChange = (event: CustomEvent) => {
    const wizardId = event.detail.value;
    wizardStore.setActiveWizard(wizardId);
  };
  
  const goToStep = (index: number) => {
    wizardStore.goToStep(index);
  };
  
  const nextStep = () => {
    wizardStore.nextStep();
  };
  
  const prevStep = () => {
    wizardStore.prevStep();
  };
  
  // Al montar el componente, seleccionamos el primer wizard por defecto
  onMounted(() => {
    if (wizards.value.length > 0) {
      selectedWizardId.value = wizards.value[0].id;
      wizardStore.setActiveWizard(wizards.value[0].id);
    }
  });
  </script>
  
  <style scoped>
  .wizard-navigation {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
  }
  
  .steps-container {
    margin: 1.5rem 0;
    overflow-x: auto;
  }
  
  .steps-wrapper {
    display: flex;
    min-width: max-content;
  }
  
  .step-item {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    margin-right: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .step-item:hover {
    background-color: rgba(var(--ion-color-primary-rgb), 0.1);
  }
  
  .step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--ion-color-medium);
    color: white;
    margin-right: 0.5rem;
  }
  
  .step-item.active .step-icon {
    background-color: var(--ion-color-primary);
  }
  
  .step-item.completed .step-icon {
    background-color: var(--ion-color-success);
  }
  
  .step-info {
    display: flex;
    flex-direction: column;
  }
  
  .step-title {
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .step-description {
    font-size: 0.75rem;
    color: var(--ion-color-medium);
  }
  
  .step-connector {
    position: absolute;
    top: 50%;
    right: -1.5rem;
    width: 1.5rem;
    height: 2px;
    background-color: var(--ion-color-medium);
  }
  
  .step-item.completed .step-connector {
    background-color: var(--ion-color-success);
  }
  
  .step-item.common {
    border-left: 3px solid var(--ion-color-warning);
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  </style>
  
  