<template>
  <ion-card class="shadow-md h-full flex flex-col sm:w-3/4  mx-auto">
    <ion-card-content class="overflow-y-auto h-full pb-5">
      <form>
        <!-- Tipo de identificación -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Tipo de Identificación</ion-label>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full">
            <!-- Select personalizado con estilos de Tailwind -->
            <div class="relative flex flex-col gap-2.5 my-2.5 w-full sm:w-1/3">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                <Icon icon="mdi:cards" width="20" height="20" />
              </div>
              <select 
                v-model="tipoIDSeleccionado" 
                class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300 appearance-none
                       hover:border-blue-400"
                :class="{ 
                  'bg-primary-50 border-primary text-primary': tipoIDSeleccionado.length > 0,
                  'border-blue-500 border-2 shadow-md': focusedField === 'tipoID'
                }"
                @focus="setFocus('tipoID')"
                @blur="clearFocus"
              >
                <option value="" disabled selected>Seleccionar</option>
                <option 
                  v-for="opcion in opcionesTipoID" 
                  :key="opcion.value" 
                  :value="opcion.value"
                >
                  {{ opcion.label }}
                </option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-500 pointer-events-none"></div>
            </div>
            
            <!-- Input personalizado con estilos de Tailwind -->
            <div class="relative flex flex-col gap-2.5 my-2.5 w-full sm:w-2/3">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon icon="mdi:card-account-details-outline" width="20" height="20" />
              </div>
              <input 
                type="text"
                placeholder="Número de identificación"
                v-model="identificacion"
                class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                       hover:border-blue-400"
                :class="{ 
                  'bg-primary-50 border-primary text-primary': identificacion.length > 0,
                  'border-blue-500 border-2 shadow-md': focusedField === 'identificacion'
                }"
                @focus="setFocus('identificacion')"
                @blur="clearFocus"
              >
            </div>
          </div>
        </ion-item>

        <!-- Nombres -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Nombres <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <input 
              type="text"
              placeholder="Ingresa tus Nombres"
              v-model="nombres"
              class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                     hover:border-blue-400"
              :class="{ 
                'bg-primary-50 border-primary text-primary': nombres.length > 0,
                'border-blue-500 border-2 shadow-md': focusedField === 'nombres'
              }"
              @focus="setFocus('nombres')"
              @blur="clearFocus"
            >
          </div>
        </ion-item>

        <!-- Apellidos -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Apellidos <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <input 
              type="text"
              placeholder="Ingresa tus Apellidos"
              v-model="apellidos"
              class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                     hover:border-blue-400"
              :class="{ 
                'bg-primary-50 border-primary text-primary': apellidos.length > 0,
                'border-blue-500 border-2 shadow-md': focusedField === 'apellidos'
              }"
              @focus="setFocus('apellidos')"
              @blur="clearFocus"
            >
          </div>
        </ion-item>

        <!-- Correo Electrónico -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Correo Electrónico <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <div class="relative w-full">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon icon="mdi:email" width="20" height="20" />
              </div>
              <input 
                type="email"
                placeholder="Email"
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

        <!-- Teléfono celular/whatsapp -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Teléfono celular/whatsapp <span class="text-blue-600">*</span></ion-label>
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

        <!-- Rol en la empresa -->
        <ion-item class="--padding-start: 0; --inner-padding-end: 0;">
          <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Selecciona tu rol en la empresa <span class="text-blue-600">*</span></ion-label>
          <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
            <select
              v-model="rolSeleccionado"
              class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300 appearance-none
                     hover:border-blue-400"
              :class="{ 
                'bg-primary-50 border-primary text-primary': rolSeleccionado.length > 0,
                'border-blue-500 border-2 shadow-md': focusedField === 'rol'
              }"
              @focus="setFocus('rol')"
              @blur="clearFocus"
            >
              <option value="" disabled selected>Seleccionar</option>
              <option
                v-for="opcion in opcionesRol"
                :key="opcion.value"
                :value="opcion.value"
              >
                {{ opcion.label }}
              </option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-500 pointer-events-none"></div>
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

// Definimos la interfaz para las opciones de tipo de ID
interface TipoIDOpcion {
  label: string;
  value: string;
}
// Definimos la interfaz para las opciones de rol
interface RolOpcion {
  label: string;
  value: string;
}

// Array con las opciones de tipo de identificación
const opcionesTipoID = ref<TipoIDOpcion[]>([
  { label: 'Cédula', value: 'cedula' },
  { label: 'Pasaporte/Identificación tributaria del exterior', value: 'pasaporte' },
  { label: 'Placa o RAMV/CPM', value: 'placa' },
  { label: 'RUC', value: 'ruc' }
]);

const opcionesRol = ref<RolOpcion[]>([
  { label: 'Gerente', value: 'gerente' },
  { label: 'Contador', value: 'contador' },
  { label: 'Dueño', value: 'dueno' },
  { label: 'Encargado', value: 'encargado' },
]);

// Variables reactivas para almacenar los valores de los campos
const tipoIDSeleccionado = ref('');
const identificacion = ref('');
const nombres = ref('');
const apellidos = ref('');
const email = ref('');
const telefono = ref('');
const rolSeleccionado = ref('');

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