<template>
    <div>
      <form>
        <!-- Configuracion de ripe sistema.illarli-->
        <div>
          <label class="block text-center">¿Usted pertenece al RIPE?</label>
          <br />
          <!-- Primera fila: Opciones de RIPE -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de compañía -->
            <div 
              v-for="opcion in opcionesRipe" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': RipeSeleccionado === opcion.value }"
              @click="seleccionarRipe(opcion.value)"
            >
              <!-- Texto centrado dentro de la card -->
              <div class="card-text">{{ opcion.label }}</div>
            </div>
          </div>
          
          <!-- Segunda fila: Tipos de RIPE (solo visible si seleccionó "Si soy Ripe") -->
          <div v-if="RipeSeleccionado === 'si'" class="card-section">
            <label class="block text-center mt-4">Tipo de RIPE</label>
            <div class="cards-container mt-2">
              <div 
                v-for="opcion in opcionesTipoRipe" 
                :key="opcion.value" 
                class="company-card" 
                :class="{ 'selected': tipoRipeSeleccionado === opcion.value }"
                @click="seleccionarTipoRipe(opcion.value)"
              >
                <div class="card-text">{{ opcion.label }}</div>
              </div>
            </div>
          </div>
          
          <!-- Tercera fila: Opción adicional para Emprendedor (solo visible si seleccionó "Emprendedor") -->
          <div v-if="tipoRipeSeleccionado === 'emprendedor'" class="card-section">
            <label class="block text-center mt-4">Seleccione solo en caso de que su empresa este obligada a llevar Contabilidad</label>
            <div class="cards-container mt-4">
              <div 
                class="company-card" 
                :class="{ 'selected': obligadoContabilidad }"
                @click="toggleObligadoContabilidad"
              >
                <div class="card-text">Obligado a llevar contabilidad</div>
              </div>
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
    (e: 'update:Ripe', value: string): void;
    (e: 'update:tipoRipe', value: string): void;
    (e: 'update:obligadoContabilidad', value: boolean): void;
  }>();
  
  // Definimos la interfaz para las opciones de tipo de ID
  interface RipeOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesRipe = ref<RipeOpcion[]>([
    { label: 'Si pertenezco al RIPE', value: 'si' },
    { label: 'No pertenezco al RIPE', value: 'no' },
  ]);
  
  // Array con las opciones de tipo de RIPE
  const opcionesTipoRipe = ref<RipeOpcion[]>([
    { label: 'Negocio Popular', value: 'negocio_popular' },
    { label: 'Emprendedor', value: 'emprendedor' },
  ]);
  
  // Variables para almacenar las selecciones
  const RipeSeleccionado = ref('');
  const tipoRipeSeleccionado = ref('');
  const obligadoContabilidad = ref(false);
  
  // Función para seleccionar un tipo de RIPE y emitir el evento
  const seleccionarRipe = (value: string) => {
    // Actualizamos el valor seleccionado
    RipeSeleccionado.value = value;
    
    // Si selecciona "No soy Ripe", limpiamos las otras selecciones
    if (value === 'no') {
      tipoRipeSeleccionado.value = '';
      obligadoContabilidad.value = false;
    }
    
    // Emitimos el evento para notificar al componente padre
    emit('update:Ripe', value);
    
    // Mensaje de depuración
    console.log('Ripe seleccionado:', value);
  };
  
  // Función para seleccionar un tipo específico de RIPE
  const seleccionarTipoRipe = (value: string) => {
    // Actualizamos el valor seleccionado
    tipoRipeSeleccionado.value = value;
    
    // Si cambia de "Emprendedor" a "Negocio Popular", reseteamos la opción de contabilidad
    if (value !== 'emprendedor') {
      obligadoContabilidad.value = false;
    }
    
    // Emitimos el evento para notificar al componente padre
    emit('update:tipoRipe', value);
    
    // Mensaje de depuración
    console.log('Tipo de RIPE seleccionado:', value);
  };
  
  // Función para alternar la opción de obligado a llevar contabilidad
  const toggleObligadoContabilidad = () => {
    // Invertimos el valor actual
    obligadoContabilidad.value = !obligadoContabilidad.value;
    
    // Emitimos el evento para notificar al componente padre
    emit('update:obligadoContabilidad', obligadoContabilidad.value);
    
    // Mensaje de depuración
    console.log('Obligado a llevar contabilidad:', obligadoContabilidad.value);
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
  
  /* Espacio para las secciones de cards */
  .card-section {
    margin-top: 1rem;
  }
  
  /* Margen superior */
  .mt-2 {
    margin-top: 0.5rem;
  }
  
  .mt-4 {
    margin-top: 1rem;
  }
  </style>