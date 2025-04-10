<template>
  <div class="w-full mx-auto relative font-sans">
    <div class="w-full h-full bg-white rounded-2xl shadow-lg pt-5 pb-4 relative z-10 overflow-hidden">
      <!-- Borde superior con animación de gradiente -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-gradient"></div>
      
      <!-- Título simplificado -->
      <h1 v-if="showTitle" class="text-xl font-bold text-center text-gray-800 mb-4">{{ title }}</h1>
      
      <!-- Contenedor de pasos -->
      <div class="relative h-[70px]">
        <!-- Contenedor flex para los pasos -->
        <div class="flex justify-between w-full box-border relative z-20 gap-[5px]">
          <div 
            v-for="(step, index) in steps" 
            :key="`step-${index}`"
            class="relative cursor-pointer transition-all duration-500 flex flex-col items-center flex-1 min-w-[130px] max-w-[150px] mx-[2px]"
            :class="{
              'completed': index < currentStep,
              'active': index === currentStep,
              'upcoming': index > currentStep,
              'mb-[10px]': index === steps.length - 1
            }"
            @click="goToStep(index)"
          >
            <!-- Indicador de paso -->
            <div class="relative w-10 h-10 mb-[10px]">
              <div class="absolute top-0 left-0 w-10 h-10 rounded-full bg-white border-2 border-blue-600/30 flex items-center justify-center font-semibold text-blue-600 transition-all duration-500 z-10 shadow-md"
                   :class="{
                     'bg-blue-600 border-blue-600 text-white scale-105': index < currentStep,
                     'border-blue-600 border-[3px] scale-110 shadow-[0_0_0_4px_rgba(0,60,255,0.1)]': index === currentStep
                   }">
                <span v-if="index < currentStep" class="step-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span v-else class="step-number">{{ index + 1 }}</span>
              </div>
            </div>
            
            <!-- Contenido del paso -->
            <div class="text-center w-full px-[5px]">
              <div class="font-semibold text-sm text-gray-800 mb-1 transition-all duration-300"
                   :class="{
                     'text-blue-600': index <= currentStep,
                     'font-bold': index === currentStep,
                     'whitespace-normal break-words leading-tight h-auto line-clamp-2': index === steps.length - 1,
                     'whitespace-nowrap': index !== steps.length - 1
                   }">
                {{ step.label }}
              </div>
              <div v-if="step.description" class="text-xs text-gray-600 transition-all duration-300 whitespace-normal leading-tight">
                {{ step.description }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Conectores entre pasos -->
        <div class="absolute top-5 left-0 w-full flex justify-between px-[30px] box-border z-10">
          <div 
            v-for="(_, index) in steps.slice(0, steps.length - 1)" 
            :key="`connector-${index}`"
            class="h-[2px] bg-blue-600/10 rounded-[2px] flex-1 mx-[5px] relative overflow-hidden"
          >
            <div 
              class="absolute top-0 left-0 h-full bg-blue-600 rounded-[2px] transition-all duration-500"
              :style="{ width: index < currentStep ? '100%' : '0%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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

<style>
@keyframes gradientMove {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

.animate-gradient {
  animation: gradientMove 3s infinite linear;
}

/* Estilos responsivos que son difíciles de reemplazar completamente con Tailwind */
@media (max-width: 768px) {
  .relative.h-\[70px\] {
    height: 140px;
  }
}

@media (max-width: 480px) {
  .min-w-\[130px\] {
    min-width: 80px;
  }
  
  .max-w-\[150px\] {
    max-width: 100px;
  }
  
  .text-xs {
    display: none;
  }
  
  .absolute.top-5.left-0.w-full.flex.justify-between.px-\[30px\] {
    padding: 0 20px;
  }
}
</style>