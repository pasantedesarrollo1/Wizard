<!--PARA RESTAURANTES-->
<template>
    <div>
      <form>
        <!-- Impuestos a Manejar-->
        <div>
          <label class="block text-center">Planes</label>
          <br />
          <!-- Reemplazamos el select por un contenedor de cards -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de impuesto -->
            <div 
              v-for="opcion in opcionesTipoPlanes" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': tiposPlanesSeleccionados.includes(opcion.value) }"
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
  interface TipoPlanesOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesTipoPlanes = ref<TipoPlanesOpcion[]>([
    { label: 'Illarli Restaurantes Plan Basico', value: 'irpb' },
    { label: 'Illarli Restaurantes Plan PYME', value: 'irpp' },
    { label: 'Promo Illarli Restaurantes Plan PYME Mensual Web (Gratis 1 Mes)', value: 'pirppw' },
    { label: 'Illarli Restaurantes Plan Incial', value: 'irpi' },
    { label: 'Illarli Restaurantes Plan Lite', value: 'irpl' },
    { label: 'Illarli Restaurantes Plan Franquicias', value: 'irpf' },
  ]);
  
  // Cambiamos la variable para almacenar múltiples selecciones usando un array
  const tiposPlanesSeleccionados = ref<string[]>([]);
  
  // Función para alternar la selección de un impuesto
  const toggleSeleccion = (value: string) => {
    // Si el valor ya está seleccionado, lo quitamos del array
    if (tiposPlanesSeleccionados.value.includes(value)) {
      tiposPlanesSeleccionados.value = tiposPlanesSeleccionados.value.filter(item => item !== value);
    } 
    // Si no está seleccionado, lo agregamos al array
    else {
      tiposPlanesSeleccionados.value.push(value);
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