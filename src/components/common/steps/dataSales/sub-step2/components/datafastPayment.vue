<template>
    <form class="w-full" @submit.prevent>
      <!-- Fila con Fecha y Valor a Pagar en columnas separadas -->
      <div class="flex flex-col md:flex-row md:gap-4">
        <!-- Input Fecha -->
        <div class="relative flex flex-col gap-2.5 my-2.5 w-full md:w-1/2">
          <label for="date" class="text-gray-700 font-medium mb-1">
            Fecha
          </label>
          <div class="relative w-full">
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Icon icon="mdi:calendar" width="20" height="20" />
            </div>
            <input
              id="date"
              type="date"
              v-model="dateValue"
              required
              class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300 hover:border-blue-400"
              :class="{
                'bg-primary-50 border-primary text-primary': dateValue,
                'border-blue-500 border-2 shadow-md': focusedField === 'date'
              }"
              @focus="setFocus('date')"
              @blur="clearFocus"
            />
          </div>
        </div>
  
        <!-- Input Valor a Pagar -->
        <div class="relative flex flex-col gap-2.5 my-2.5 w-full md:w-1/2">
          <label for="amount" class="text-gray-700 font-medium mb-1">
            Valor pagado
          </label>
          <div class="relative w-full">
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Icon icon="mdi:currency-usd" width="20" height="20" />
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Valor a pagar"
              v-model.number="amountValue"
              required
              class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300 hover:border-blue-400 no-spinner"
              :class="{
                'bg-primary-50 border-primary text-primary': amountValue > 0,
                'border-blue-500 border-2 shadow-md': focusedField === 'amount'
              }"
              @focus="setFocus('amount')"
              @blur="clearFocus"
            />
          </div>
        </div>
      </div>
  
      <!-- Tipo de tarjeta -->
      <div class="relative flex flex-col gap-2.5 my-2.5 w-full">
        <label for="typeCard" class="text-gray-700 font-medium mb-1">
          Tipo de tarjeta
        </label>
        <div class="relative w-full">
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Icon icon="famicons:card-outline" width="20" height="20" />
          </div>
          <input
            id="typeCard"
            type="text"
            placeholder="Ej.: Visa"
            v-model="typeCard"
            required
            class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300 hover:border-blue-400"
            :class="{
              'bg-primary-50 border-primary text-primary': typeCard.length > 0,
              'border-blue-500 border-2 shadow-md': focusedField === 'typeCard'
            }"
            @focus="setFocus('typeCard')"
            @blur="clearFocus"
          />
        </div>
      </div>
  
      <!-- Input del lote -->
      <div class="relative flex flex-col gap-2.5 my-2.5 w-full">
        <label for="numberLote" class="text-gray-700 font-medium mb-1">
          Número de Lote
        </label>
        <div class="relative w-full">
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Icon icon="f7:number" width="20" height="20" />
          </div>
          <input
            id="numberLote"
            type="text"
            placeholder="Ingresa el número de lote"
            v-model="numberLoteValue"
            required
            class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300 hover:border-blue-400"
            :class="{
              'bg-primary-50 border-primary text-primary': numberLoteValue.length > 0,
              'border-blue-500 border-2 shadow-md': focusedField === 'numberLote'
            }"
            @focus="setFocus('numberLote')"
            @blur="clearFocus"
          />
        </div>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { Icon } from '@iconify/vue';
  import { useWizardStore } from "@/stores/wizardStore";
  
  // Obtener la instancia del store
  const wizardStore = useWizardStore();
  
  // Variables reactivas para cada campo
  const typeCard = ref('');
  const amountValue = ref<number>(0);
  const numberLoteValue = ref('');
  
  // Formatear la fecha actual en formato YYYY-MM-DD para el input date
  const formatCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const dateValue = ref(formatCurrentDate());
  
  // Variable para controlar el campo enfocado
  const focusedField = ref('');
  
  // Funciones para manejar el enfoque
  const setFocus = (fieldName: string) => {
    focusedField.value = fieldName;
  };
  
  const clearFocus = () => {
    focusedField.value = '';
  };
  
  // Variables para controlar si los datos han sido cargados
  const isDataLoaded = ref(false);
  
  onMounted(() => {
    // Obtener los datos actuales
    const salesData = wizardStore.getStepData("salesData") || {};
    const paymentData = salesData.payment || {};
    const datafastData = paymentData.datafastData || {};
    
    // Cargar datos si existen
    if (paymentData.date) {
      dateValue.value = paymentData.date;
    }
    
    if (paymentData.amount !== undefined && paymentData.amount > 0) {
      amountValue.value = paymentData.amount;
    }
    
    if (datafastData.typeCard) {
      typeCard.value = datafastData.typeCard;
    }
    
    if (datafastData.numberLote) {
      numberLoteValue.value = datafastData.numberLote;
    }
    
    // Si no hay fecha definida, guardar la fecha actual
    if (!paymentData.date) {
      updateDate(dateValue.value);
    }
  
    isDataLoaded.value = true;
  });
  
  // Función para actualizar los datos de pago
  const updatePaymentData = (partialData: Record<string, any>) => {
    const salesData = wizardStore.getStepData("salesData") || {};
    const paymentData = salesData.payment || {};
    
    // Actualizar los datos de pago manteniendo los valores existentes
    wizardStore.updateFormSection("salesData", {
      payment: {
        ...paymentData,
        ...partialData
      }
    });
  };
  
  // Función para actualizar los datos de datafast
  const updateDatafastData = (partialData: Record<string, any>) => {
    const salesData = wizardStore.getStepData("salesData") || {};
    const paymentData = salesData.payment || {};
    const datafastData = paymentData.datafastData || {};
    
    // Actualizar los datos de datafast manteniendo los valores existentes
    wizardStore.updateFormSection("salesData", {
      payment: {
        ...paymentData,
        datafastData: {
          ...datafastData,
          ...partialData
        }
      }
    });
  };
  
  // Actualizar el store cuando cambie el valor de cada campo
  const updateDate = (newValue: string) => {
    updatePaymentData({ date: newValue });
  };
  
  const updateAmount = (newValue: number) => {
    updatePaymentData({ amount: newValue });
  };
  
  const updateTypeCard = (newValue: string) => {
    updateDatafastData({ typeCard: newValue });
  };
  
  const updateNumberLote = (newValue: string) => {
    updateDatafastData({ numberLote: newValue });
  };
  
  // Observadores para los campos
  watch(
    () => isDataLoaded.value,
    (loaded) => {
      if (loaded) {
        watch(dateValue, updateDate);
        watch(amountValue, updateAmount);
        watch(typeCard, updateTypeCard);
        watch(numberLoteValue, updateNumberLote);
      }
    },
    { immediate: true }
  );
  </script>
  
  <style scoped>
  :root {
    --primary-color: var(--ion-color-primary);
    --primary-light: rgba(var(--ion-color-primary-rgb), 0.1);
    --primary-lighter: rgba(var(--ion-color-primary-rgb), 0.05);
  }
  
  input:focus {
    outline: none;
    border-color: #1a73e8 !important;
    border-width: 2px !important;
    box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.1);
  }
  
  .border-blue-500 {
    border-color: rgb(0, 60, 255) !important;
    border-width: 2px !important;
    box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.1);
  }
  
  /* Eliminar flechas (spinner) de los inputs numéricos */
  .no-spinner::-webkit-inner-spin-button,
  .no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Para Firefox */
  .no-spinner {
    -moz-appearance: textfield;
  }
  
  @media (max-width: 640px) {
    input {
      padding: 0.6rem 1rem 0.6rem 2.5rem !important;
    }
  }
  </style>