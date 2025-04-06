<template>
    <div>
      <form>
        <!-- Configuracion de Artesano de Artesano sistema.illarli-->
        <div>
          <label class="block text-center">¿Usted es Artesano? </label>
          <br />
          <!-- Reemplazamos el select por un contenedor de cards -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de compañía -->
            <div 
              v-for="opcion in opcionesArtesano" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': ArtesanoSeleccionado === opcion.value }"
              @click="seleccionarArtesano(opcion.value)"
            >
              <!-- Texto centrado dentro de la card -->
              <div class="card-text">{{ opcion.label }}</div>
            </div>
          </div>
          
          <!-- Segunda fila: Input para número de Artesano (solo visible si seleccionó "Si soy Artesano de Artesano") -->
          <div v-if="ArtesanoSeleccionado === 'si'" class="input-container">
            <!-- Añadimos un label y un input para el número de Artesano -->
            <label class="block text-center mt-4">Ingrese el numero de artesano</label>
            <input 
              type="text" 
              v-model="numeroArtesano" 
              class="agent-input" 
              @input="actualizarNumeroArtesano"
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
    (e: 'update:Artesano', value: string): void;
    (e: 'update:NumeroArtesano', value: string): void; // Nuevo evento para el número de Artesano
  }>();
  
  // Definimos la interfaz para las opciones de tipo de ID
  interface ArtesanoOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesArtesano = ref<ArtesanoOpcion[]>([
    { label: 'Si soy Artesano', value: 'si' },
    { label: 'No soy Artesano', value: 'no' },
  ]);
  
  // Variable para almacenar el tipo de ID seleccionado
  const ArtesanoSeleccionado = ref('');
  
  // Variable para almacenar el número de Artesano
  const numeroArtesano = ref('');
  
  // Función para seleccionar un tipo de compañía y emitir el evento
  const seleccionarArtesano = (value: string) => {
    // Actualizamos el valor seleccionado
    ArtesanoSeleccionado.value = value;
    
    // Si selecciona "No soy Artesano de Artesano", limpiamos el número de Artesano
    if (value === 'no') {
      numeroArtesano.value = '';
      // Emitimos el evento con valor vacío para notificar al componente padre
      emit('update:NumeroArtesano', '');
    }
    
    // Emitimos el evento para notificar al componente padre
    emit('update:Artesano', value);
    
    // Mensaje de depuración
    console.log('Artesano seleccionado:', value);
  };
  
  // Función para actualizar el número de Artesano y emitir el evento
  const actualizarNumeroArtesano = () => {
    // Emitimos el evento para notificar al componente padre
    emit('update:NumeroArtesano', numeroArtesano.value);
    
    // Mensaje de depuración
    console.log('Número de Artesano:', numeroArtesano.value);
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