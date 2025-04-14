<template>
  <div class="relative flex flex-col gap-2.5 my-2.5 w-full">
    <div class="relative w-full">
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <Icon icon="mdi:receipt" width="20" height="20" />
      </div>
      <input 
        type="text"
        placeholder="Ingresa el número de comprobante"
        v-model="proofPaymentValue"
        required
        class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
               hover:border-blue-400"
        :class="{ 
          'bg-primary-50 border-primary text-primary': proofPaymentValue.length > 0,
          'border-blue-500 border-2 shadow-md': focusedField === 'proofPayment'
        }"
        @focus="setFocus('proofPayment')"
        @blur="clearFocus"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Icon } from '@iconify/vue'; // Importación de Iconify
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Variable reactiva para almacenar el valor del comprobante
const proofPaymentValue = ref('');

// Variable para controlar qué campo está enfocado
const focusedField = ref('');

// Funciones para manejar el enfoque
const setFocus = (fieldName: string) => {
  focusedField.value = fieldName;
};

const clearFocus = () => {
  focusedField.value = '';
};

// Cargar datos del store si existen
onMounted(() => {
  const salesData = wizardStore.getStepData("salesData");
  if (salesData && salesData.proofPayment) {
    proofPaymentValue.value = salesData.proofPayment;
  }
});

// Actualizar el store cuando cambie el valor
watch(proofPaymentValue, (newValue) => {
  wizardStore.updateFormSection("salesData", { proofPayment: newValue });
});
</script>

<style scoped>
/* Variables para colores y estilos que no se pueden implementar fácilmente con Tailwind */
:root {
  --primary-color: var(--ion-color-primary);
  --primary-light: rgba(var(--ion-color-primary-rgb), 0.1);
  --primary-lighter: rgba(var(--ion-color-primary-rgb), 0.05);
}

/* Estilos para inputs enfocados */
input:focus {
  outline: none;
  border-color: #1a73e8 !important;
  border-width: 2px !important;
  box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.1);
}

/* Clase para mantener el estilo de enfoque */
.border-blue-500 {
  border-color: rgb(0,60,255) !important;
  border-width: 2px !important;
  box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.1);
}

/* Media queries para responsividad específica */
@media (max-width: 640px) {
  input {
    padding: 0.6rem 1rem 0.6rem 2.5rem !important;
  }
}
</style>