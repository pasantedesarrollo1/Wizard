<template>
    <div class="progress-bar-container">
      <!-- Contenedor principal de la barra de progreso -->
      <div class="steps-container">
        <!-- Iteramos sobre cada paso para crear los elementos de la barra -->
        <div 
          v-for="(paso, index) in pasos" 
          :key="index" 
          class="step-item"
          :class="{
            'active': pasoActual >= index,
            'completed': pasoActual > index
          }"
        >
          <!-- Círculo indicador del paso -->
          <div class="step-circle">
            <!-- Muestra un icono de verificación si el paso está completado,
                 de lo contrario muestra el número del paso -->
            <span v-if="pasoActual > index" class="check-icon">
              <ion-icon name="checkmark-outline"></ion-icon>
            </span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          
          <!-- Etiqueta del paso -->
          <div class="step-label">
            {{ paso.label }}
          </div>
          
          <!-- Línea conectora entre pasos (excepto para el último elemento) -->
          <div v-if="index < pasos.length - 1" class="step-line"
               :class="{ 'active-line': pasoActual > index }"></div>
        </div>
      </div>
  
      <!-- Información adicional del paso actual (opcional) -->
      <div v-if="pasos[pasoActual]" class="paso-info">
        <p>{{ pasos[pasoActual].descripcion }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, withDefaults } from 'vue';
  import { IonIcon } from '@ionic/vue';
  
  // Definición de la interfaz para representar un paso del wizard
  interface Paso {
    label: string;      // Etiqueta visible del paso
    descripcion: string; // Descripción opcional del paso
    key: string;        // Clave única para identificar el paso
  }
  
  // Props que puede recibir el componente desde el exterior
  interface Props {
    // Paso actual en el que se encuentra el usuario (comienza en 0)
    modelValue?: number;
    // Lista personalizada de pasos (opcional)
    pasosProp?: Paso[];
  }
  
  // Establecemos valores por defecto para las props
  const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    pasosProp: () => []
  });
  
  // Definimos los pasos del wizard como constantes
  // Esto se puede personalizar según las necesidades de la aplicación
  const pasosPredefinidos: Paso[] = [
    {
      label: 'Información',
      descripcion: 'Ingresa la información básica',
      key: 'informacion'
    },
    {
      label: 'Detalles',
      descripcion: 'Completa los detalles necesarios',
      key: 'detalles'
    },
    {
      label: 'Revisión',
      descripcion: 'Revisa la información proporcionada',
      key: 'revision'
    },
    {
      label: 'Confirmación',
      descripcion: 'Confirma y finaliza el proceso',
      key: 'confirmacion'
    }
  ];
  
  // Si se proporcionan pasos personalizados, los usamos; de lo contrario, usamos los predefinidos
  const pasos = ref<Paso[]>(props.pasosProp.length > 0 ? props.pasosProp : pasosPredefinidos);
  
  // El paso actual basado en la prop modelValue
  const pasoActual = ref(props.modelValue);
  
  // En una implementación completa, aquí se añadirían métodos para:
  // - Avanzar al siguiente paso
  // - Retroceder al paso anterior
  // - Ir a un paso específico
  // - Emitir eventos cuando cambia el paso
  
  // Ejemplo de métodos que se implementarían en una versión funcional:
  /*
  const emit = defineEmits(['update:modelValue', 'paso-cambiado']);
  
  const avanzar = () => {
    if (pasoActual.value < pasos.value.length - 1) {
      pasoActual.value++;
      emit('update:modelValue', pasoActual.value);
      emit('paso-cambiado', pasos.value[pasoActual.value]);
    }
  };
  
  const retroceder = () => {
    if (pasoActual.value > 0) {
      pasoActual.value--;
      emit('update:modelValue', pasoActual.value);
      emit('paso-cambiado', pasos.value[pasoActual.value]);
    }
  };
  
  const irAPaso = (index: number) => {
    if (index >= 0 && index < pasos.value.length) {
      pasoActual.value = index;
      emit('update:modelValue', pasoActual.value);
      emit('paso-cambiado', pasos.value[pasoActual.value]);
    }
  };
  */
  </script>
  
  <style scoped>
  /* Estilos para el contenedor principal */
  .progress-bar-container {
    width: 100%;
    padding: 1.5rem 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  /* Contenedor de los pasos */
  .steps-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin-bottom: 1.5rem;
  }
  
  /* Estilo para cada elemento/paso individual */
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
    z-index: 2;
  }
  
  /* Círculo indicador de paso */
  .step-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #e0e0e0;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
  }
  
  /* Estilo cuando el paso está activo */
  .step-item.active .step-circle {
    background-color: var(--ion-color-primary, #3880ff);
    color: white;
    box-shadow: 0 0 0 4px rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.2);
  }
  
  /* Estilo cuando el paso está completado */
  .step-item.completed .step-circle {
    background-color: var(--ion-color-success, #2dd36f);
    color: white;
  }
  
  /* Línea conectora entre pasos */
  .step-line {
    position: absolute;
    top: 15px; /* Centrada verticalmente respecto al círculo */
    height: 3px;
    background-color: #e0e0e0;
    width: 100%;
    left: 50%;
    z-index: 1;
  }
  
  /* Línea activa entre pasos */
  .step-line.active-line {
    background-color: var(--ion-color-primary, #3880ff);
  }
  
  /* Etiqueta del paso */
  .step-label {
    font-size: 0.85rem;
    color: #666;
    margin-top: 0.25rem;
    text-align: center;
    max-width: 100px; /* Límite para evitar etiquetas muy largas */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s ease;
  }
  
  /* Etiqueta cuando el paso está activo */
  .step-item.active .step-label {
    color: var(--ion-color-primary, #3880ff);
    font-weight: 500;
  }
  
  /* Estilo del icono de verificación */
  .check-icon {
    font-size: 1rem;
  }
  
  /* Información adicional del paso actual */
  .paso-info {
    text-align: center;
    margin-top: 1rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  /* Estilos responsivos para pantallas pequeñas */
  @media (max-width: 576px) {
    .step-label {
      font-size: 0.7rem;
      max-width: 70px;
    }
    
    .step-circle {
      width: 24px;
      height: 24px;
      font-size: 0.8rem;
    }
    
    .step-line {
      top: 12px;
    }
  }
  </style>