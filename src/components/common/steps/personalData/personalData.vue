<template>
  <div class="container-wrapper">
    <ion-card class="wizard-card main-container">
      <!-- Aplicamos una altura máxima y habilitamos el scroll, pero de manera controlada -->
      <ion-card-content class="wizard-content">
        <div class="form-container">
          <span>Ingresa tus datos personales para crear tu empresa</span>
          <form @submit.prevent>
            <!-- Tipo de identificación -->
            <ion-item class="ion-item-custom">
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
                    @change="updateStore"
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
                    @input="updateStore"
                  >
                </div>
              </div>
            </ion-item>

            <!-- Nombres -->
            <ion-item class="ion-item-custom">
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
                  @input="updateStore"
                >
              </div>
            </ion-item>

            <!-- Apellidos -->
            <ion-item class="ion-item-custom">
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
                  @input="updateStore"
                >
              </div>
            </ion-item>

            <!-- Correo Electrónico -->
            <ion-item class="ion-item-custom">
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
                    @input="updateStore"
                  >
                </div>
              </div>
            </ion-item>

            <!-- Teléfono celular/whatsapp -->
            <ion-item class="ion-item-custom">
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
                      'bg-primary-50 border-primary text-primary': focusedField === 'telefono' && telefono.length > 0,
                      'border-blue-500 border-2 shadow-md': focusedField === 'telefono'
                    }"
                    @focus="setFocus('telefono')"
                    @blur="clearFocus"
                    @input="updateStore"
                  >
                </div>
              </div>
            </ion-item>
          </form>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import { Icon } from '@iconify/vue'; // Importación de Iconify
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Definimos la interfaz para las opciones de tipo de ID
interface TipoIDOpcion {
  label: string;
  value: string;
}

// Array con las opciones de tipo de identificación
const opcionesTipoID = ref<TipoIDOpcion[]>([
  { label: 'Cédula', value: 'cedula' },
  { label: 'RUC', value: 'ruc' }
]);


// Variables reactivas para almacenar los valores de los campos
const tipoIDSeleccionado = ref('');
const identificacion = ref('');
const nombres = ref('');
const apellidos = ref('');
const email = ref('');
const telefono = ref('');

// Variable para controlar qué campo está enfocado
const focusedField = ref('');

// Funciones para manejar el enfoque
const setFocus = (fieldName: string) => {
  focusedField.value = fieldName;
};

const clearFocus = () => {
  focusedField.value = '';
};

// Función para actualizar el store con los valores actuales
const updateStore = () => {
  wizardStore.updateFormSection("personalInfo", {
    identification: {
      type: tipoIDSeleccionado.value,
      number: identificacion.value
    },
    name: {
      first: nombres.value,
      last: apellidos.value
    },
    contact: {
      email: email.value,
      phone: {
        mobile: telefono.value,
        landline: "" // No tenemos un campo para teléfono fijo, lo dejamos vacío
      }
    },
  });
};

// Cargar datos del store si existen
onMounted(() => {
  const personalInfo = wizardStore.getStepData("personalInfo");
  if (personalInfo) {
    if (personalInfo.identification) {
      tipoIDSeleccionado.value = personalInfo.identification.type || '';
      identificacion.value = personalInfo.identification.number || '';
    }
    if (personalInfo.name) {
      nombres.value = personalInfo.name.first || '';
      apellidos.value = personalInfo.name.last || '';
    }
    if (personalInfo.contact) {
      email.value = personalInfo.contact.email || '';
      if (personalInfo.contact.phone) {
        telefono.value = personalInfo.contact.phone.mobile || '';
      }
    }
  }
});

// Observar cambios en todos los campos para actualizar el store
watch(
  [tipoIDSeleccionado, identificacion, nombres, apellidos, email, telefono],
  () => {
    updateStore();
  }
);
</script>

<style lang="scss" scoped>
// Variables para colores y estilos que no se pueden implementar fácilmente con Tailwind
$primary-color: var(--ion-color-primary);
$primary-light: rgba(var(--ion-color-primary-rgb), 0.1);
$primary-lighter: rgba(var(--ion-color-primary-rgb), 0.05);

// Contenedor principal con ancho máximo - NUEVO
.container-wrapper {
  @apply w-full flex justify-center;
}

// Configuración del ancho fijo para pantallas grandes - NUEVO
.main-container {
  width: 100%;
  max-width: 100%;
  
  @media (min-width: 768px) {
    max-width: 768px; // Ancho fijo de 768px en pantallas de 768px en adelante
  }
}

// Estilos para la tarjeta principal
.wizard-card {
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%; // Asegura que la tarjeta ocupe toda la altura disponible
}

.wizard-content {
  padding: 16px;
  flex: 1; // Permite que el contenido ocupe todo el espacio disponible
  overflow-y: auto; // Habilita el scroll vertical
  height: 100%; // Asegura que el contenido ocupe toda la altura disponible
}

// Contenedor del formulario
.form-container {
  padding-bottom: 20px; // Espacio adicional al final del formulario
}

// Estilos específicos para ion-item que no se pueden hacer con Tailwind
.ion-item-custom {
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
}
</style>