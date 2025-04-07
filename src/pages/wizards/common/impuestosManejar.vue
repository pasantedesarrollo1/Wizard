<template>
  <div>
    <form>
      <!-- Configuracion de Impuestos de Impuestos sistema.illarli-->
      <div>
        <label class="block text-center">¿Tipo de impuestos que maneja su Empresa? </label>
        <br />
        <!-- Reemplazamos el select por un contenedor de cards -->
        <div class="cards-container">
          <!-- Iteramos sobre las opciones para crear una card por cada tipo de compañía -->
          <div 
            v-for="opcion in opcionesImpuestos" 
            :key="opcion.value" 
            class="company-card" 
            :class="{ 'selected': ImpuestosSeleccionado === opcion.value }"
            @click="seleccionarImpuestos(opcion.value)"
          >
            <!-- Texto centrado dentro de la card -->
            <div class="card-text">{{ opcion.label }}</div>
          </div>
        </div>
        
        <!-- Segunda fila: Input para número de Impuestos (solo visible si seleccionó "Si soy Impuestos de Impuestos") -->
        <div v-if="ImpuestosSeleccionado === '5'" class="input-container">
          <!-- Añadimos un label y un input para el número de Impuestos -->
          <label class="block text-center mt-4">Ingrese su codigo del SRI para manejar 5% de impuestos</label>
          <input 
            type="text" 
            v-model="numeroImpuestos" 
            class="agent-input" 
            @input="actualizarNumeroImpuestos"
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
  (e: 'update:Impuestos', value: string): void;
  (e: 'update:NumeroImpuestos', value: string): void; // Nuevo evento para el número de Impuestos
}>();

// Definimos la interfaz para las opciones de tipo de ID
interface ImpuestosOpcion {
  label: string;
  value: string;
}

// Array con las opciones de tipo de identificación
const opcionesImpuestos = ref<ImpuestosOpcion[]>([
  { label: '15%', value: '15' },
  { label: '5%', value: '5' },
  { label: '0%', value: '0' },
]);

// Variable para almacenar el tipo de ID seleccionado
const ImpuestosSeleccionado = ref('');

// Variable para almacenar el número de Impuestos
const numeroImpuestos = ref('');

// Función para seleccionar un tipo de compañía y emitir el evento
const seleccionarImpuestos = (value: string) => {
  // Actualizamos el valor seleccionado
  ImpuestosSeleccionado.value = value;
  
  // Si selecciona "No soy Impuestos de Impuestos", limpiamos el número de Impuestos
  if (value === 'no') {
    numeroImpuestos.value = '';
    // Emitimos el evento con valor vacío para notificar al componente padre
    emit('update:NumeroImpuestos', '');
  }
  
  // Emitimos el evento para notificar al componente padre
  emit('update:Impuestos', value);
  
  // Mensaje de depuración
  console.log('Impuestos seleccionado:', value);
};

// Función para actualizar el número de Impuestos y emitir el evento
const actualizarNumeroImpuestos = () => {
  // Emitimos el evento para notificar al componente padre
  emit('update:NumeroImpuestos', numeroImpuestos.value);
  
  // Mensaje de depuración
  console.log('Número de Impuestos:', numeroImpuestos.value);
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