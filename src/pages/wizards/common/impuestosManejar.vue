<template>
    <div>
      <form>
        <!-- Impuestos a Manejar-->
        <div>
          <label class="block text-center">Impuestos A Manejar</label>
          <br />
          <!-- Reemplazamos el select por un contenedor de cards -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de impuesto -->
            <div 
              v-for="opcion in opcionesTipoImpuestos" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': tiposImpuestosSeleccionados.includes(opcion.value) }"
              @click="toggleSeleccion(opcion.value)"
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
  interface TipoImpuestosOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesTipoImpuestos = ref<TipoImpuestosOpcion[]>([
    { label: 'IVA Diferenciado', value: 'iva-diferenciado' },
    { label: 'Exento de IVA', value: 'exento-de-iva' },
    { label: 'No Objeto de Impuesto', value: 'no-objeto-de-impuestos' },
    { label: 'IVA 15%', value: 'iva-15' },
    { label: 'IVA 14%', value: 'iva-14' },
    { label: 'IVA 13%', value: 'iva-13' },
    { label: 'IVA 12%', value: 'iva-12' },
    { label: 'IVA 5%', value: 'iva-5' },
    { label: 'IVA 0%', value: 'iva-0' },
  ]);
  
  // Cambiamos la variable para almacenar múltiples selecciones usando un array
  const tiposImpuestosSeleccionados = ref<string[]>([]);
  
  // Función para alternar la selección de un impuesto
  const toggleSeleccion = (value: string) => {
    // Si el valor ya está seleccionado, lo quitamos del array
    if (tiposImpuestosSeleccionados.value.includes(value)) {
      tiposImpuestosSeleccionados.value = tiposImpuestosSeleccionados.value.filter(item => item !== value);
    } 
    // Si no está seleccionado, lo agregamos al array
    else {
      tiposImpuestosSeleccionados.value.push(value);
    }
  };
  
  // El resto del formulario sigue siendo simple sin validaciones ni estilos adicionales
  </script>
  
  <style scoped>
  /* Contenedor para centrar las cards */
  .cards-container {
    display: flex;
    flex-wrap: wrap; /* Permitimos que las cards se envuelvan en múltiples líneas */
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
    margin-bottom: 0.5rem; /* Espacio adicional entre filas */
    
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