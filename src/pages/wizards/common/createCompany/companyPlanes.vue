<template>
  <div>
    <form>
      <div>
        <label class="block text-center">Selecciona el plan de tu preferencia</label>
        <br />
        
        <!-- Switch para alternar entre Mensual y Anual -->
        <div class="switch-container">
          <span :class="{ 'active-period': !esAnual }">Mensual</span>
          <div class="toggle-switch" @click="togglePeriodo">
            <div class="toggle-button" :class="{ 'toggle-annual': esAnual }"></div>
          </div>
          <span :class="{ 'active-period': esAnual }">Anual</span>
        </div>
        
        <!-- Contenedor de cards -->
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
            <div class="card-text">
              <div>{{ opcion.label }}</div>
              <!-- Mostramos el precio según el periodo seleccionado -->
              <div class="price">{{ esAnual ? opcion.precioAnual : opcion.precioMensual }}</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Definimos la interfaz para las opciones de tipo de plan con precios
interface TipoPlanesOpcion {
  label: string;
  value: string;
  precioMensual: string; // Añadimos el precio mensual
  precioAnual: string;   // Añadimos el precio anual
}

// Estado para controlar si se muestra el precio anual o mensual
const esAnual = ref<boolean>(false);

// Función para alternar entre periodo mensual y anual
const togglePeriodo = () => {
  // Cambiamos el valor de esAnual al opuesto del actual
  esAnual.value = !esAnual.value;
};

// Array con las opciones de tipo de plan incluyendo precios
const opcionesTipoPlanes = ref<TipoPlanesOpcion[]>([
  { 
    label: 'Plan Gratuito', 
    value: 'pg',
    precioMensual: '0$', // Precio mensual del plan gratuito
    precioAnual: '0$'    // Precio anual del plan gratuito
  },
  { 
    label: 'Plan Lite', 
    value: 'pl',
    precioMensual: '10$', // Precio mensual del plan lite
    precioAnual: '120$'   // Precio anual del plan lite
  },
  { 
    label: 'Plan Básico', 
    value: 'pb',
    precioMensual: '20$', // Precio mensual del plan básico
    precioAnual: '240$'   // Precio anual del plan básico
  },
  { 
    label: 'Plan Pyme', 
    value: 'pp',
    precioMensual: '30$', // Precio mensual del plan pyme
    precioAnual: '360$'   // Precio anual del plan pyme
  },
]);

// Variable para almacenar el plan seleccionado
const tipoPlanSeleccionado = ref<string>('');

// Función para seleccionar un plan
const seleccionarPlan = (value: string) => {
  // Asignamos el valor seleccionado, reemplazando cualquier selección anterior
  tipoPlanSeleccionado.value = value;
};
</script>

<style scoped>
/* Contenedor para centrar las cards */
.cards-container {
  display: flex;
  flex-wrap: wrap; /* Permitimos que las cards se envuelvan en múltiples líneas */
  justify-content: center; /* Centra las cards horizontalmente */
  gap: 1rem; /* Espacio entre las cards */
  margin-top: 1.5rem; /* Aumentamos el margen superior para dar espacio al switch */
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

/* Estilos para el precio */
.price {
  font-weight: bold;
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

/* Estilos para el switch de periodo */
.switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.toggle-switch {
  width: 50px;
  height: 24px;
  background-color: #ccc;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
}

.toggle-button {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle-annual {
  transform: translateX(26px);
}

.active-period {
  font-weight: bold;
  color: #333;
}
</style>