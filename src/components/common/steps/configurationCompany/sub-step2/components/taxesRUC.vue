<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <!-- Grid mejorado con animaciones y efectos -->
    <span>Puedes elegir más de un impuesto a aplicar en tus ventas</span>
    
    <!-- Contenedor centrado para las tarjetas -->
    <div class="flex justify-center items-center gap-4 mt-3">
      <div 
        v-for="opcion in opcionesImpuesto"
        :key="opcion.value"
        class="unified-card w-[90px] h-[70px] rounded-[16px] transition-all duration-300 cursor-pointer p-2 flex items-center justify-center"
        :class="{ 'selected-card': impuestosSeleccionados.includes(opcion.value) }"
        @click="toggleImpuesto(opcion.value)"
      >
        <div 
          class="tax-number text-3xl font-bold transition-all duration-300"
          :class="{ 'text-white': impuestosSeleccionados.includes(opcion.value), 'text-blue-600': !impuestosSeleccionados.includes(opcion.value) }"
        >
          {{ opcion.label }}
        </div>
      </div>
    </div>
    
    <!-- Campo de entrada simplificado para el código de 5% -->
    <div v-if="impuestosSeleccionados.includes('5')" class="mt-4">
      <div class="text-sm text-gray-700 mb-1">Código para 5%</div>
      <input
        type="text"
        placeholder="Ingresa tu código para 5%"
        v-model="codigoImpuesto"
        class="w-full border border-gray-300 rounded-md p-2 text-base"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ImpuestoOpcion {
  label: string
  value: string
}

const opcionesImpuesto = ref<ImpuestoOpcion[]>([
  { label: '15%', value: '15' },
  { label: '5%', value: '5' },
  { label: '0%', value: '0' }
])

// Cambiado a array para permitir selección múltiple
const impuestosSeleccionados = ref<string[]>(['15'])
const codigoImpuesto = ref('')

const toggleImpuesto = (value: string) => {
  const index = impuestosSeleccionados.value.indexOf(value)
  
  if (index === -1) {
    // Si no está seleccionado, lo añadimos
    impuestosSeleccionados.value.push(value)
  } else {
    // Si ya está seleccionado, lo quitamos
    impuestosSeleccionados.value.splice(index, 1)
  }
  
  console.log('Impuestos seleccionados:', impuestosSeleccionados.value)
  
  // Si se deselecciona 5%, limpiar el código
  if (!impuestosSeleccionados.value.includes('5%')) {
    codigoImpuesto.value = ''
  }
}
</script>

<style lang="scss" scoped>
/* Estilos unificados para la tarjeta */
.unified-card {
  border: 1px solid #e5e7eb; /* Borde sutil por defecto */
  background-color: white;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0px 0px 15px 1px rgba(0, 60, 255, 0.25);
    transform: scale(0.98);
    border-color: transparent;
  }
}

/* Estilos para cards seleccionadas */
.selected-card {
  box-shadow: 0px 0px 15px 1px rgba(0, 60, 255, 0.40);
  transform: scale(0.98);
  background-color: rgb(0, 60, 255) !important; /* Color azul específico */
  border-color: transparent !important;
}

/* Estilos para los números de impuesto */
.tax-number {
  transition: all 0.3s ease;
  line-height: 1;
}

/* Estilos responsivos adicionales */
@media (max-width: 576px) {
  .unified-card {
    width: 80px;
    height: 60px;
  }
  
  .tax-number {
    font-size: 1.5rem;
  }
}
</style>