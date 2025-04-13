<template>
  <div class="progress-container">
    <!-- Tarjeta principal con altura reducida -->
    <div class="progress-card">
      <!-- Borde superior con animación de gradiente -->
      <div class="gradient-border"></div>
      
      <!-- Título con menor espaciado -->
      <h1 v-if="showTitle" class="progress-title">{{ title }}</h1>
      
      <!-- Contenedor de pasos con altura reducida -->
      <div class="steps-container">
        <!-- Contenedor flex para los pasos con mejor distribución horizontal -->
        <div class="steps-wrapper">
          <div 
            v-for="(step, index) in steps" 
            :key="`step-${index}`"
            class="step-item"
            :class="{
              'completed': index < currentStep,
              'active': index === currentStep,
              'upcoming': index > currentStep
            }"
            @click="goToStep(index)"
          >
            <!-- Indicador de paso más pequeño -->
            <div class="step-indicator-wrapper">
              <div class="step-indicator"
                   :class="{
                     'completed-indicator': index < currentStep,
                     'active-indicator': index === currentStep
                   }">
                <span v-if="index < currentStep" class="step-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span v-else class="step-number">{{ index + 1 }}</span>
              </div>
            </div>
            
            <!-- Contenido del paso con texto más compacto -->
            <div class="step-content">
              <div class="step-label"
                   :class="{
                     'active-label': index <= currentStep,
                     'current-label': index === currentStep,
                     'last-step-label': index === steps.length - 1
                   }">
                {{ step.label }}
              </div>
              <div v-if="step.description" class="step-description">
                {{ step.description }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Conectores entre pasos con mejor posicionamiento -->
        <div class="connectors-container">
          <div 
            v-for="(_, index) in steps.slice(0, steps.length - 1)" 
            :key="`connector-${index}`"
            class="connector"
          >
            <div 
              class="connector-fill"
              :style="{ width: index < currentStep ? '100%' : '0%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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
/* Estilos base y contenedor principal */
.progress-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

.progress-card {
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 12px 16px 10px; /* Padding reducido */
  position: relative;
  z-index: 10;
  overflow: hidden;
}

/* Borde superior con animación */
.gradient-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6);
  background-size: 200% 100%;
  animation: gradientMove 3s infinite linear;
}

@keyframes gradientMove {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

/* Título con menor espaciado */
.progress-title {
  font-size: 1.125rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
  margin-bottom: 0.75rem;
  padding: 0 0.5rem;
  line-height: 1.2;
}

/* Contenedor de pasos con altura reducida */
.steps-container {
  position: relative;
  min-height: 60px; /* Altura reducida */
  margin-bottom: 0;
}

/* Wrapper de pasos */
.steps-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 20;
  gap: 4px;
}

/* Elementos de paso individuales */
.step-item {
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 100px;
  max-width: 150px;
  margin: 0 2px;
}

/* Wrapper del indicador de paso */
.step-indicator-wrapper {
  position: relative;
  width: 2rem; /* Tamaño reducido */
  height: 2rem; /* Tamaño reducido */
  margin-bottom: 0.5rem; /* Margen reducido */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Indicador de paso */
.step-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 2rem; /* Tamaño reducido */
  height: 2rem; /* Tamaño reducido */
  border-radius: 50%;
  background-color: white;
  border: 2px solid rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem; /* Texto más pequeño */
  color: #3b82f6;
  transition: all 0.4s ease;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

/* Indicador completado */
.completed-indicator {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
  transform: scale(1.05);
}

/* Indicador activo */
.active-indicator {
  border: 2px solid #3b82f6;
  transform: scale(1.1);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

/* Contenido del paso */
.step-content {
  text-align: center;
  width: 100%;
  padding: 0 2px;
}

/* Etiqueta del paso */
.step-label {
  font-weight: 600;
  font-size: 0.75rem; /* Texto más pequeño */
  color: #4b5563;
  margin-bottom: 0.125rem; /* Margen reducido */
  transition: all 0.3s ease;
  line-height: 1.1;
}

/* Etiqueta activa */
.active-label {
  color: #3b82f6;
}

/* Etiqueta actual */
.current-label {
  font-weight: 700;
}

/* Etiqueta del último paso */
.last-step-label {
  white-space: normal;
  overflow-wrap: break-word;
  line-height: 1.1;
  height: auto;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Descripción del paso */
.step-description {
  font-size: 0.7rem; /* Texto más pequeño */
  color: #6b7280;
  transition: all 0.3s ease;
  white-space: normal;
  line-height: 1.1;
  display: none; /* Ocultar por defecto para ahorrar espacio */
}

/* Mostrar descripción solo en pantallas grandes */
@media (min-width: 768px) {
  .active .step-description {
    display: block;
  }
}

/* Contenedor de conectores */
.connectors-container {
  position: absolute;
  top: 1rem; /* Posición ajustada */
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  box-sizing: border-box;
  z-index: 10;
}

/* Conector individual */
.connector {
  height: 2px;
  background-color: rgba(59, 130, 246, 0.15);
  border-radius: 2px;
  flex: 1;
  margin: 0 5px;
  position: relative;
  overflow: hidden;
}

/* Relleno del conector */
.connector-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #3b82f6;
  border-radius: 2px;
  transition: all 0.5s ease;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .steps-container {
    min-height: 70px; /* Altura reducida en tablets */
  }
  
  .step-item {
    min-width: 80px;
    max-width: 120px;
  }
}

@media (max-width: 480px) {
  .progress-card {
    padding: 10px 8px 8px;
  }
  
  .step-item {
    min-width: 60px;
    max-width: 80px;
  }
  
  .step-indicator-wrapper {
    width: 1.75rem;
    height: 1.75rem;
    margin-bottom: 0.35rem;
  }
  
  .step-indicator {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.7rem;
  }
  
  .step-label {
    font-size: 0.65rem;
  }
  
  .connectors-container {
    padding: 0 1.5rem;
  }
}
</style>