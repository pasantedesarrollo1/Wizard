<template>
  <div class="wizard-master-container">
    <div class="wizard-container w-full">
      <!-- Título simplificado -->
      <h1 class="wizard-title" v-if="showTitle">{{title }}</h1>
      
      <!-- Contenedor de pasos -->
      <div class="steps-timeline">
        <!-- Contenedor flex para los pasos -->
        <div class="timeline-steps-container">
          <div 
            v-for="(step, index) in steps" 
            :key="`step-${index}`"
            class="timeline-step"
            :class="{
              'completed': index < currentStep,
              'active': index === currentStep,
              'upcoming': index > currentStep
            }"
            @click="goToStep(index)"
          >
            <!-- Indicador de paso -->
            <div class="step-node">
              <div class="node-inner-circle">
                <span v-if="index < currentStep" class="step-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span v-else class="step-number">{{ index + 1 }}</span>
              </div>
            </div>
            
            <!-- Contenido del paso -->
            <div class="step-content">
              <div class="step-title">{{ step.label }}</div>
              <div class="step-description" v-if="step.description">{{ step.description }}</div>
            </div>
          </div>
        </div>
        
        <!-- Conectores entre pasos -->
        <div class="step-connectors-container">
          <div 
            v-for="(_, index) in steps.slice(0, steps.length - 1)" 
            :key="`connector-${index}`"
            class="step-connector"
          >
            <div 
              class="connector-progress" 
              :style="{ width: index < currentStep ? '100%' : '0%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits } from 'vue';

interface Step {
  label: string;
  key?: string;
  description?: string;
}

const props = defineProps<{
  steps: Step[];
  currentStep: number;
  title?: string;
  showTitle?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:currentStep', value: number): void;
}>();

// Método de navegación
const goToStep = (index: number) => {
  // Solo permite la navegación a pasos anteriores o al siguiente paso
  if (index < props.currentStep || index === props.currentStep + 1) {
    emit('update:currentStep', index);
  }
};
</script>

<style scoped>
/* Contenedor principal */
.wizard-master-container {
  width: 100%;
  margin: 0 auto;
  padding: 0px;
  position: relative;
  font-family: var(--ion-font-family, 'Inter', 'Roboto', sans-serif);
}

/* Contenedor principal del wizard */
.wizard-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 60, 255, 0.1);
  padding-top: 20px;
  padding-bottom: 15px;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.wizard-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #003cff, #4d7fff, #003cff);
  background-size: 200% 100%;
  animation: gradientMove 3s infinite linear;
}

@keyframes gradientMove {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

/* Línea de tiempo de pasos */
.steps-timeline {
  position: relative;
  height: 70px; /* Aumentado de 100px a 120px para dar más espacio vertical */
}

/* Contenedor de pasos con flexbox */
.timeline-steps-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  gap: 5px;
}

/* Contenedor de conectores */
.step-connectors-container {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  z-index: 1;
}

/* Paso de la línea de tiempo */
.timeline-step {
  position: relative;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 130px; /* Aumentado de 100px a 130px para evitar saltos de línea */
  max-width: 150px; /* Aumentado de 100px a 150px para dar más espacio al texto */
  margin: 0 2px;
}

/* Conector de pasos */
.step-connector {
  height: 2px;
  background-color: rgba(0, 60, 255, 0.1);
  border-radius: 2px;
  flex: 1;
  margin: 0 5px;
  position: relative;
  overflow: hidden;
}

.connector-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #003cff;
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Nodo de paso */
.step-node {
  position: relative;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.node-inner-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid rgba(0, 60, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #003cff;
  transition: all 0.5s ease;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 60, 255, 0.1);
}

.step-content {
  text-align: center;
  width: 100%;
  padding: 0 5px; /* Añadido padding horizontal para dar más espacio al texto */
}

.step-title {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  transition: all 0.3s ease;
  white-space: nowrap; /* Evita que el título se rompa en múltiples líneas */
}

.step-description {
  font-size: 12px;
  color: #666;
  transition: all 0.3s ease;
  /* Permitimos que la descripción se ajuste en múltiples líneas si es necesario */
  white-space: normal;
  line-height: 1.2;
}

/* Estados de los pasos */
.timeline-step.completed .node-inner-circle {
  background-color: #003cff;
  border-color: #003cff;
  color: white;
  transform: scale(1.05);
}

.timeline-step.completed .step-title {
  color: #003cff;
}

.timeline-step.active .node-inner-circle {
  border-color: #003cff;
  border-width: 3px;
  transform: scale(1.1);
  box-shadow: 0 0 0 4px rgba(0, 60, 255, 0.1);
}

.timeline-step.active .step-title {
  color: #003cff;
  font-weight: 700;
}

/* Ajustes responsivos */
@media (max-width: 768px) {
  .steps-timeline {
    height: 140px;
  }
  
  .timeline-step {
    min-width: 110px; /* Reducido para pantallas medianas */
    max-width: 130px;
  }
  
  .step-title {
    white-space: normal; /* Permitimos saltos de línea en pantallas más pequeñas */
    font-size: 13px;
  }
  
  .timeline-steps-container {
    padding: 0 10px;
  }
  
  .step-connectors-container {
    padding: 0 30px;
  }
}

@media (max-width: 480px) {
  .wizard-container {
    padding: 15px 10px;
  }
  
  .wizard-title {
    font-size: 20px;
  }
  
  .step-node {
    width: 30px;
    height: 30px;
  }
  
  .node-inner-circle {
    width: 30px;
    height: 30px;
  }
  
  .step-title {
    font-size: 12px;
  }
  
  .timeline-step {
    min-width: 80px; /* Reducido para pantallas muy pequeñas */
    max-width: 100px;
  }
  
  .step-description {
    display: none;
  }
  
  .timeline-steps-container {
    padding: 0 5px;
  }
  
  .step-connectors-container {
    padding: 0 20px;
  }
}
</style>

