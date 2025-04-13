<template>
  <ion-card class="shadow-md h-full flex flex-col sm:w-3/4 mx-auto">
    <ion-card-content class="overflow-y-auto h-full pb-5">
      <form @submit.prevent>
        <!-- Comprobante de pago -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Comprobante de pago <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <div class="relative w-full">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon icon="mdi:receipt" width="20" height="20" />
              </div>
              <input 
                type="text"
                placeholder="Comprobante de pago"
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
        </ion-item>
      </form>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import { Icon } from '@iconify/vue'; // Importación de Iconify

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
</script>

<style lang="scss" scoped>
// Variables para colores y estilos que no se pueden implementar fácilmente con Tailwind
$primary-color: var(--ion-color-primary);
$primary-light: rgba(var(--ion-color-primary-rgb), 0.1);
$primary-lighter: rgba(var(--ion-color-primary-rgb), 0.05);

// Estilos específicos para ion-item que no se pueden hacer con Tailwind
ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

// Estilos para inputs enfocados
input:focus, select:focus {
  outline: none;
  border-color: #1a73e8 !important;
  border-width: 2px !important;
  box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.1);
}

// Clase para mantener el estilo de enfoque
.border-blue-500 {
  border-color: rgb(0,60,255) !important;
  border-width: 2px !important;
  box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.1);
}

// Media queries para responsividad específica
@media (max-width: 640px) {
  input, select {
    padding: 0.6rem 1rem 0.6rem 2.5rem !important;
  }
  
  .ion-card {
    width: 100% !important;
    margin: 0 auto;
  }
}
</style>