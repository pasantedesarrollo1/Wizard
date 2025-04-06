<template>
    <div>
      <form>
        <!-- Restaurante -->
        <div>
          <label class="block text-center">Establecimiento Turistico</label>
          <br />
          <!-- Contenedor para la card de despacho -->
          <div class="cards-container">
            <!-- Card única para despacho que se puede seleccionar/deseleccionar -->
            <div 
              class="company-card" 
              :class="{ 'selected': turisticoSeleccionado }"
              @click="toggleDespacho"
            >
              <!-- Texto centrado dentro de la card -->
              <div class="card-text">{{ opcionTuristico.label }}</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Definimos la interfaz para la opción de despacho
  interface turisticoOpcion {
    label: string;
    value: string;
  }
  
  // Definimos una única opción para despacho posterior
  // Se eliminó la opción de "Establecimiento Turistico" como solicitado
  const opcionTuristico = ref<turisticoOpcion>({
    label: 'Establecimiento Turistico', 
    value: 'establecimiento-turistico'
  });
  
  // Variable para controlar si el despacho está seleccionado o no
  // Ahora es un booleano para facilitar la selección/deselección
  const turisticoSeleccionado = ref(false);
  
  // Función para alternar la selección del despacho (seleccionar/deseleccionar)
  const toggleDespacho = () => {
    turisticoSeleccionado.value = !turisticoSeleccionado.value;
  };
  
  // El resto del formulario sigue siendo simple sin validaciones ni estilos adicionales
  </script>
  
  <style scoped>
  /* Contenedor para centrar la card */
  .cards-container {
    display: flex;
    justify-content: center; /* Centra la card horizontalmente */
    margin-top: 0.5rem;
  }
  
  /* Estilos básicos para la card */
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