<!--central.illarli-->
<template>
    <div>
      <form>
        <!-- Configuracion de documentos sistema.illarli-->
        <div>
          <label class="block text-center">¿Su empresa necesita manejar Control de Inventario? </label>
          <br />
          <!-- Reemplazamos el select por un contenedor de cards -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de compañía -->
            <div 
              v-for="opcion in opcionesInventario" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': InventarioSeleccionado === opcion.value }"
              @click="seleccionarInventario(opcion.value)"
            >
              <!-- Texto centrado dentro de la card -->
            <div class="card-text">{{ opcion.label }}</div>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  // Definimos los eventos que puede emitir este componente
  const emit = defineEmits<{
    (e: 'update:Inventario', value: string): void;
  }>();
  
  // Definimos la interfaz para las opciones de tipo de ID
  interface InventarioOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesInventario = ref<InventarioOpcion[]>([
    { label: 'Si necesito manejar Control de Inventario', value: 'si' },
    { label: 'No necesito manejar Control de Inventario', value: 'no' },
  ]);
  
  // Variable para almacenar el tipo de ID seleccionado
  const InventarioSeleccionado = ref('');
  
  // Función para seleccionar un tipo de compañía y emitir el evento
  const seleccionarInventario = (value: string) => {
    // Actualizamos el valor seleccionado
    InventarioSeleccionado.value = value;
    
    // Emitimos el evento para notificar al componente padre
    emit('update:Inventario', value);
    
    // Mensaje de depuración
    console.log('Inventario seleccionado:', value);
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
  </style>