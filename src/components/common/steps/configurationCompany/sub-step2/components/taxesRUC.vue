<template>
  <span>Selecciona <b>los impuestos</b> a aplicar en tus ventas</span>

  <div class="p-2 py-2 bg-white rounded-xl">
    <!-- Contenedor centrado para las tarjetas -->
    <div class="flex justify-center items-center gap-4 mt-3">
      <div 
        v-for="opcion in opcionesImpuesto"
        :key="opcion.value"
        class="unified-card w-[90px] h-[70px] rounded-[16px] transition-all duration-300 cursor-pointer p-2 flex items-center justify-center border border-gray-200 bg-white hover:shadow-blue-300 hover:shadow-md hover:scale-[0.98] hover:border-transparent sm:w-[80px] sm:h-[60px]"
        :class="{ 'selected-card': isSelected(opcion.value) }"
        @click="toggleImpuesto(opcion.value)"
      >
        <div 
          class="text-3xl font-bold transition-all duration-300 leading-none sm:text-2xl"
          :class="{ 'text-white': isSelected(opcion.value), 'text-blue-600': !isSelected(opcion.value) }"
        >
          {{ opcion.label }}
        </div>
      </div>
    </div>
    
    <!-- Campo de entrada simplificado para el código de 5% -->
    <div v-if="isSelected('5')" class="mt-4">
      <div class="text-sm text-gray-700 mb-1">Código para 5%</div>
      <input
        type="text"
        placeholder="Ingresa tu código para 5%"
        v-model="data.taxes.taxCode5Percent"
        class="w-full border border-gray-300 rounded-md p-2 text-base transition-all duration-300 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 sm:text-sm sm:p-1.5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInitialData } from "@/composables/useInitialData"

interface ImpuestoOpcion {
  label: string
  value: string
}

const opcionesImpuesto = ref<ImpuestoOpcion[]>([
  { label: '15%', value: '15' },
  { label: '5%', value: '5' },
  { label: '0%', value: '0' }
])

// Valores iniciales para el formulario - 15% seleccionado por defecto
const initialValues = {
  taxes: {
    selectedTaxes: ['15'], // Inicializado con un array que contiene '15'
    taxCode5Percent: ''
  }
};

// Usar el composable useInitialData para manejar los datos
const { data, updateNestedField } = useInitialData(
  "companyConfig",
  initialValues,
  {
    autoSave: true,
    debug: true, // Activamos el modo debug para ver los logs
    nestedFields: {
      taxes: ["selectedTaxes", "taxCode5Percent"]
    }
  }
);

const selectedTaxesRef = computed(() => data.value.taxes.selectedTaxes);

// Asegurarse de que selectedTaxes es un array y contiene '15' al inicio
onMounted(() => {
  // Verificar si selectedTaxes existe y es un array
  if (!Array.isArray(selectedTaxesRef.value)) {
    // Si no es un array, inicializarlo con '15'
    updateNestedField("taxes", "selectedTaxes", ['15']);
    console.log('selectedTaxes inicializado con [15]');
  } else if (!selectedTaxesRef.value.includes('15')) {
    // Si es un array pero no contiene '15', añadirlo
    const updatedTaxes = [...selectedTaxesRef.value, '15'];
    updateNestedField("taxes", "selectedTaxes", updatedTaxes);
    console.log('15% añadido a selectedTaxes:', updatedTaxes);
  } else {
    console.log('selectedTaxes ya contiene 15%:', selectedTaxesRef.value);
  }
});

const isSelected = (value: string): boolean => {
  const currentTaxes = Array.isArray(selectedTaxesRef.value) ? selectedTaxesRef.value : [];
  return currentTaxes.includes(value);
};

const toggleImpuesto = (value: string) => {
  // Asegurarse de que selectedTaxes es un array
  const currentTaxes = Array.isArray(selectedTaxesRef.value) 
    ? [...selectedTaxesRef.value] 
    : [];
  
  const index = currentTaxes.indexOf(value);
  
  if (index === -1) {
    // Si no está seleccionado, lo añadimos
    currentTaxes.push(value);
  } else {
    // Si ya está seleccionado, lo quitamos
    // No permitimos quitar cualquier impuesto si es el único seleccionado
    if (currentTaxes.length > 1) {
      currentTaxes.splice(index, 1);
    } else {
      console.log(`No se puede deseleccionar ${value}% cuando es el único impuesto seleccionado`);
      return; // Salir de la función sin hacer cambios
    }
  }
  
  // Actualizar el store con los nuevos impuestos seleccionados
  updateNestedField("taxes", "selectedTaxes", currentTaxes);
  
  console.log('Impuestos seleccionados:', currentTaxes);
  
  // Si se deselecciona 5%, limpiar el código
  if (!currentTaxes.includes('5')) {
    updateNestedField("taxes", "taxCode5Percent", '');
  }
}
</script>

<style scoped>
/* Estilos para cards seleccionadas que no se pueden lograr fácilmente con Tailwind */
.selected-card {
  box-shadow: 0px 0px 15px 1px rgba(0, 60, 255, 0.40);
  transform: scale(0.98);
  background-color: rgb(0, 60, 255) !important;
  border-color: transparent !important;
}
</style>