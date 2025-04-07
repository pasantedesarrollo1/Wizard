<!--PARA COMERCIOS sistema.illarli-->
<template>
  <div>
    <form>
      <!-- Impuestos a Manejar-->
      <div>
        <label class="block text-center">Planes</label>
        <br />
        <!-- Reemplazamos el select por un contenedor de cards -->
        <div class="cards-container">
          <!-- Iteramos sobre las opciones para crear una card por cada tipo de plan -->
          <div 
            v-for="opcion in opcionesTipoPlanes" 
            :key="opcion.value" 
            class="company-card" 
            :class="{ 'selected': tipoPlanSeleccionado === opcion.value }" 
            @click="seleccionarPlan(opcion.value)"
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
  { label: 'Plan Gratuito', value: 'pg' },
  { label: 'Plan Lite', value: 'pl' },
  { label: 'Plan Básico', value: 'pb' },
  { label: 'Plan Pyme', value: 'pp' },
]);

// Modificado: Cambiamos de un array a un string único para almacenar solo un valor seleccionado
const tipoPlanSeleccionado = ref<string>('');

// Modificado: Reemplazamos la función toggleSeleccion por seleccionarPlan que asigna directamente el valor
const seleccionarPlan = (value: string) => {
  // Simplemente asignamos el valor seleccionado, reemplazando cualquier selección anterior
  tipoPlanSeleccionado.value = value;
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