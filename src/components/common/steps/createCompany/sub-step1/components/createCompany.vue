<template>
  <ion-card class="shadow-md h-auto flex flex-col sm:w-full mx-auto">
    <ion-card-content class="overflow-y-auto h-full pb-5">
      <form @submit.prevent>
        <!-- RUC y Razón social en la misma fila -->
        <div class="flex flex-col md:flex-row md:gap-4">
          <!-- RUC -->
          <ion-item class="--padding-start: 0; --inner-padding-end: 0; flex-1">
            <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">RUC <span class="text-blue-600">*</span></ion-label>
            <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
              <div class="relative w-full">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Icon icon="mdi:file-document-outline" width="20" height="20" />
                </div>
                <input 
                  type="text"
                  v-model="ruc"
                  class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                         hover:border-blue-400"
                  :class="{ 
                    'bg-primary-50 border-primary text-primary': ruc.length > 0,
                    'border-blue-500 border-2 shadow-md': focusedField === 'ruc'
                  }"
                  @focus="setFocus('ruc')"
                  @blur="clearFocus"
                  readonly
                >
              </div>
            </div>
          </ion-item>
          
          <!-- Razón social -->
          <ion-item class="--padding-start: 0; --inner-padding-end: 0; flex-1">
            <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Razón social <span class="text-blue-600">*</span></ion-label>
            <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
              <div class="relative w-full">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Icon icon="mdi:domain" width="20" height="20" />
                </div>
                <input 
                  type="text"
                  v-model="razonSocial"
                  class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                         hover:border-blue-400"
                  :class="{ 
                    'bg-primary-50 border-primary text-primary': razonSocial.length > 0,
                    'border-blue-500 border-2 shadow-md': focusedField === 'razonSocial'
                  }"
                  @focus="setFocus('razonSocial')"
                  @blur="clearFocus"
                  readonly
                >
              </div>
            </div>
          </ion-item>
        </div>

        <!-- Nombre empresa -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Nombre de tu Empresa <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <div class="relative w-full">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon icon="mdi:office-building" width="20" height="20" />
              </div>
              <input 
                type="text"
                placeholder="Nombre de tu empresa"
                v-model="nombreEmpresa"
                class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                       hover:border-blue-400"
                :class="{ 
                  'bg-primary-50 border-primary text-primary': nombreEmpresa.length > 0,
                  'border-blue-500 border-2 shadow-md': focusedField === 'nombreEmpresa'
                }"
                @focus="setFocus('nombreEmpresa')"
                @blur="clearFocus"
              >
            </div>
          </div>
        </ion-item>

        <!-- Dirección de la Empresa -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Dirección de tu Empresa <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <div class="relative w-full">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon icon="mdi:map-marker" width="20" height="20" />
              </div>
              <input 
                type="text"
                placeholder="Dirección de tu empresa"
                v-model="direccion"
                class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                       hover:border-blue-400"
                :class="{ 
                  'bg-primary-50 border-primary text-primary': direccion.length > 0,
                  'border-blue-500 border-2 shadow-md': focusedField === 'direccion'
                }"
                @focus="setFocus('direccion')"
                @blur="clearFocus"
              >
            </div>
          </div>
        </ion-item>

        <!-- Teléfonos -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Teléfonos de tu empresa <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <div class="relative w-full">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon icon="mdi:phone" width="20" height="20" />
              </div>
              <input 
                type="tel"
                placeholder="+593"
                v-model="telefono"
                class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                       hover:border-blue-400"
                :class="{ 
                  'bg-primary-50 border-primary text-primary': telefono.length > 0,
                  'border-blue-500 border-2 shadow-md': focusedField === 'telefono'
                }"
                @focus="setFocus('telefono')"
                @blur="clearFocus"
              >
            </div>
          </div>
        </ion-item>

        <!-- Correo Electrónico -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Correo Electrónico Empresarial <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <div class="relative w-full">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon icon="mdi:email" width="20" height="20" />
              </div>
              <input 
                type="email"
                placeholder="Email empresarial"
                v-model="email"
                class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                       hover:border-blue-400"
                :class="{ 
                  'bg-primary-50 border-primary text-primary': email.length > 0,
                  'border-blue-500 border-2 shadow-md': focusedField === 'email'
                }"
                @focus="setFocus('email')"
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
import { ref, onMounted, watch } from 'vue';
import { useWizardStore } from "@/stores/wizardStore";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import { Icon } from '@iconify/vue'; // Importación de Iconify

// Obtener la instancia del store
const wizardStore = useWizardStore();
// Variables reactivas para almacenar los valores de los campos
const nombreEmpresa = ref('');
const ruc = ref('');
const razonSocial = ref('');
const direccion = ref('');
const telefono = ref('');
const email = ref('');

// Variable para controlar qué campo está enfocado
const focusedField = ref('');

// Cargar datos del store si existen
onMounted(() => {
  const companyCreation = wizardStore.getStepData("companyCreation");
  if (companyCreation && companyCreation.ruc) {
    ruc.value = companyCreation.ruc;
  }
  if (companyCreation && companyCreation.legalName) {
    razonSocial.value = companyCreation.legalName;
  }
});

// Observar cambios en el valor para actualizar el store
watch(ruc, (newValue) => {
  wizardStore.updateFormSection("companyCreation", { ruc, value: newValue });
});
watch(razonSocial, (newValue) => {
  wizardStore.updateFormSection("companyCreation", { razonSocial, value: newValue });
});

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