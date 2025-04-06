<template>
    <div>
      <form>
        <!-- Configuracion de agente de retencion sistema.illarli-->
        <div>
          <label class="block text-center">¿Usted es Agente de Retencion? </label>
          <br />
          <!-- Reemplazamos el select por un contenedor de cards -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de compañía -->
            <div 
              v-for="opcion in opcionesRetencion" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': RetencionSeleccionado === opcion.value }"
              @click="seleccionarRetencion(opcion.value)"
            >
              <!-- Texto centrado dentro de la card -->
              <div class="card-text">{{ opcion.label }}</div>
            </div>
          </div>
          
          <!-- Segunda fila: Input para número de agente (solo visible si seleccionó "Si soy Agente de Retencion") -->
          <div v-if="RetencionSeleccionado === 'si'" class="input-container">
            <!-- Añadimos un label y un input para el número de agente -->
            <label class="block text-center mt-4">Ingrese el numero de agente</label>
            <input 
              type="text" 
              v-model="numeroAgente" 
              class="agent-input" 
              @input="actualizarNumeroAgente"
              placeholder="Ej: 12345678"
            />
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  // Definimos los eventos que puede emitir este componente
  const emit = defineEmits<{
    (e: 'update:Retencion', value: string): void;
    (e: 'update:NumeroAgente', value: string): void; // Nuevo evento para el número de agente
  }>();
  
  // Definimos la interfaz para las opciones de tipo de ID
  interface RetencionOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesRetencion = ref<RetencionOpcion[]>([
    { label: 'Si soy Agente de Retencion', value: 'si' },
    { label: 'No soy Agente de Retencion', value: 'no' },
  ]);
  
  // Variable para almacenar el tipo de ID seleccionado
  const RetencionSeleccionado = ref('');
  
  // Variable para almacenar el número de agente
  const numeroAgente = ref('');
  
  // Función para seleccionar un tipo de compañía y emitir el evento
  const seleccionarRetencion = (value: string) => {
    // Actualizamos el valor seleccionado
    RetencionSeleccionado.value = value;
    
    // Si selecciona "No soy Agente de Retencion", limpiamos el número de agente
    if (value === 'no') {
      numeroAgente.value = '';
      // Emitimos el evento con valor vacío para notificar al componente padre
      emit('update:NumeroAgente', '');
    }
    
    // Emitimos el evento para notificar al componente padre
    emit('update:Retencion', value);
    
    // Mensaje de depuración
    console.log('Retencion seleccionado:', value);
  };
  
  // Función para actualizar el número de agente y emitir el evento
  const actualizarNumeroAgente = () => {
    // Emitimos el evento para notificar al componente padre
    emit('update:NumeroAgente', numeroAgente.value);
    
    // Mensaje de depuración
    console.log('Número de agente:', numeroAgente.value);
  };
  </script>
  
  <style scoped>
  /* Contenedor para centrar las cards */
  .cards-container {
    display: flex;
    justify-content: center; /* Centra las cards horizontalmente */
    gap: 1rem; /* Espacio entre las cards */
    margin-top: 0.5rem;
  }
  
  /* Estilos básicos para las cards */
  .company-card {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 1rem;
    cursor: pointer;
    min-width: 120px;
    
    /* Centrar el texto dentro de la card */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  /* Estilo para la card seleccionada */
  .company-card.selected {
    border-color: black;
    background-color: #f0f0f0;
  }
  
  /* Contenedor para el input */
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  
  /* Estilo para el input */
  .agent-input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 200px;
    text-align: center;
  }
  
  /* Margen superior */
  .mt-4 {
    margin-top: 1rem;
  }
  </style>