<template>
    <div>
      <form>
        <!-- Tipo de empresa-->
        <div>
          <label class="block text-center">Tipo Compania</label>
          <br />
          <!-- Reemplazamos el select por un contenedor de cards -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de compañía -->
            <div 
              v-for="opcion in opcionesTipoCompnay" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': TipoCompnaySeleccionado === opcion.value }"
              @click="TipoCompnaySeleccionado = opcion.value"
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
  import { ref } from 'vue';
  
  // Definimos la interfaz para las opciones de tipo de ID
  interface TipoCompnayOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesTipoCompnay = ref<TipoCompnayOpcion[]>([
    { label: 'Comercios', value: 'comercios' },
    { label: 'Restaurante', value: 'restaurante' },
  ]);
  
  // Variable para almacenar el tipo de ID seleccionado
  const TipoCompnaySeleccionado = ref('');
  
  // El resto del formulario sigue siendo simple sin validaciones ni estilos adicionales
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