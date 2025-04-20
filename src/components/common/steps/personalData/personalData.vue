<template>
  <div class="w-full flex justify-center">
    <ion-card class="wizard-card main-container">
      <!-- Aplicamos una altura máxima y habilitamos el scroll, pero de manera controlada -->
      <ion-card-content class="wizard-content">
        <div class="pb-5">
          <span>Ingresa tus datos personales para crear tu empresa</span>
          <form @submit.prevent>
            <!-- Tipo de identificación -->
            <ion-item class="ion-item-custom">
              <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Tipo de Identificación</ion-label>
              <div class="flex flex-col sm:flex-row gap-2 w-full">
                <!-- Select personalizado con estilos de Tailwind -->
                <div class="relative flex flex-col gap-2.5 my-2.5 w-full sm:w-1/3">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                    <Icon icon="mdi:cards" width="20" height="20" />
                  </div>
                  <select 
                    v-model="data.identification.type" 
                    class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300 appearance-none
                           hover:border-blue-400"
                    :class="{ 
                      'bg-primary-50 border-primary text-primary': data.identification.type.length > 0,
                      'border-blue-500 border-2 shadow-md': focusedField === 'tipoID'
                    }"
                    @focus="setFocus('tipoID')"
                    @blur="clearFocus"
                    required
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
                    v-model="data.identification.number"
                    @input="handleIdentificationNumberInput"
                    class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                           hover:border-blue-400"
                    :class="{ 
                      'bg-primary-50 border-primary text-primary': data.identification.number.length > 0,
                      'border-blue-500 border-2 shadow-md': focusedField === 'identificacion',
                      'cursor-not-allowed opacity-70': !data.identification.type
                    }"
                    @focus="setFocus('identificacion')"
                    @blur="clearFocus"
                    :disabled="!data.identification.type"
                    required
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
                  v-model="data.name.first"
                  @input="handleNameInput"
                  class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                         hover:border-blue-400"
                  :class="{ 
                    'bg-primary-50 border-primary text-primary': data.name.first.length > 0,
                    'border-blue-500 border-2 shadow-md': focusedField === 'nombres'
                  }"
                  @focus="setFocus('nombres')"
                  @blur="clearFocus"
                  required
                >
              </div>
            </ion-item>

            <!-- Apellidos -->
            <ion-item class="ion-item-custom">
              <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1 ">Apellidos <span class="text-blue-600">*</span></ion-label>
              <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
                <input 
                  type="text"
                  placeholder="Ingresa tus Apellidos"
                  v-model="data.name.last"
                  @input="handleLastInput"
                  class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                         hover:border-blue-400"
                  :class="{ 
                    'bg-primary-50 border-primary text-primary': data.name.last.length > 0,
                    'border-blue-500 border-2 shadow-md': focusedField === 'apellidos'
                  }"
                  @focus="setFocus('apellidos')"
                  @blur="clearFocus"
                  required
                >
              </div>
            </ion-item>

            <!-- Correo Electrónico - CORREGIDO -->
            <ion-item class="ion-item-custom">
              <ion-label position="stacked" class="text-lg font-semibold text-gray-800 pl-1">Correo Electrónico <span class="text-blue-600">*</span></ion-label>
              <div class="relative flex flex-col gap-2.5 my-2.5 w-full mt-2.5">
                <!-- Contenedor del input con posición relativa -->
                <div class="relative w-full">
                  <!-- Icono posicionado relativo al input, no al contenedor principal -->
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                    <Icon icon="mdi:email" width="20" height="20" />
                  </div>
                  <input 
                    type="email"
                    placeholder="Email"
                    v-model="data.contact.email"
                    @input="handleEmailInput"
                    class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                           hover:border-blue-400"
                    :class="{ 
                      'bg-primary-50 border-primary text-primary': data.contact.email.length > 0,
                      'border-blue-500 border-2 shadow-md': focusedField === 'email',
                      'valid-email': emailIsValid && data.contact.email.length > 0,
                      'invalid-email': !emailIsValid && data.contact.email.length > 0
                    }"
                    @focus="setFocus('email')"
                    @blur="clearFocus"
                    required
                  >
                </div>
                <!-- Mensaje de error para email inválido - AHORA FUERA DEL CONTENEDOR DEL INPUT -->
                <div v-if="!emailIsValid && data.contact.email.length > 0" class="email-error-message">
                  Por favor, ingrese un correo electrónico válido
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
                    type="phone"
                    placeholder="+593"
                    v-model="data.contact.phone"
                    @input="handlePhoneInput"
                    class="w-full p-3 pl-12 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none transition-all duration-300
                           hover:border-blue-400"
                    :class="{ 
                      'bg-primary-50 border-primary text-primary': focusedField === 'telefono' && data.contact.phone.length > 0,
                      'border-blue-500 border-2 shadow-md': focusedField === 'telefono'
                    }"
                    @focus="setFocus('telefono')"
                    @blur="clearFocus"
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
import { ref, watch, onMounted } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import { Icon } from '@iconify/vue'; // Importación de Iconify
import { useInitialData } from "@/composables/useInitialData";
import {
  allowOnlyLetters,
  validateEmailInRealTime,
  formatPhoneNumber,
  formatEcuadorianId
} from "@/utils/input-controls";

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

// Valores iniciales para el formulario
const initialValues = {
  identification: {
    type: '',
    number: ''
  },
  name: {
    first: '',
    last: ''
  },
  contact: {
    email: '',
    phone: ''
  }
};

// Usar el composable useInitialData para manejar los datos
const { data } = useInitialData(
  "personalInfo",
  initialValues,
  {
    autoSave: true,
    debug: false,
    nestedFields: {
      identification: ["type", "number"],
      name: ["first", "last"],
      contact: ["email", "phone"]
    }
  }
);

// Variable para controlar qué campo está enfocado
const focusedField = ref('');

// Variable para controlar la validez del email
const emailIsValid = ref(true);

// Funciones para manejar el enfoque
const setFocus = (fieldName: string) => {
  focusedField.value = fieldName;
};

const clearFocus = () => {
  focusedField.value = '';
};

const showIcons = ref(false);

onMounted(() => {
  showIcons.value = true;
});

// Manejador de input para el número de identificación que aplica validación según el tipo seleccionado
const handleIdentificationNumberInput = (event: Event) => {
  // Aplicar diferentes validaciones según el tipo de identificación seleccionado
  if (data.value.identification.type === 'ruc') {
    // Si es RUC, usar formatEcuadorianId
    data.value.identification.number = formatEcuadorianId(event);
  } else if (data.value.identification.type === 'cedula') {
    // Si es Cédula, usar formatPhoneNumber
    data.value.identification.number = formatPhoneNumber(event);
  } else {
    // Si no hay tipo seleccionado o es otro tipo, permitir solo números
    const input = event.target as HTMLInputElement;
    data.value.identification.number = input.value.replace(/\D/g, '');
  }
};

// Manejadores de eventos para los inputs con validación
const handleNameInput = (event: Event) => {
  data.value.name.first = allowOnlyLetters(event);
};

const handleLastInput = (event: Event) => {
  data.value.name.last = allowOnlyLetters(event);
};

const handlePhoneInput = (event: Event) => {
  data.value.contact.phone = formatPhoneNumber(event);
};

const handleEmailInput = (event: Event) => {
  // Usar la nueva función de validación en tiempo real
  const result = validateEmailInRealTime(event);
  data.value.contact.email = result.value;
  emailIsValid.value = result.isValid;
};

// Watch para limpiar el número de identificación si cambia el tipo
watch(() => data.value.identification.type, () => {
  // Limpiar el número de identificación cuando cambia el tipo
  data.value.identification.number = '';
});
</script>

<style scoped>
/* Configuración del ancho fijo para pantallas grandes */
.main-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (min-width: 768px) {
  .main-container {
    max-width: 768px;
  }
}

/* Estilos para el contenido */
.wizard-content {
  flex: 1;
  overflow-y: auto;
  height: 100%;
}

/* Eliminar completamente líneas y espacios en ion-item */
.ion-item-custom {
  --border-color: transparent !important;
}

/* Estilos para inputs enfocados */
input:focus, select:focus {
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

/* Estilos para validación de email */
.valid-email {
  border-color: #10b981 !important;
  background-color: rgba(16, 185, 129, 0.05) !important;
}

.invalid-email {
  border-color: #ef4444 !important;
  background-color: rgba(239, 68, 68, 0.05) !important;
}

.email-error-message {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  padding-left: 0.5rem;
}

/* Media queries para responsividad específica */
@media (max-width: 640px) {
  input, select {
    padding: 0.6rem 1rem 0.6rem 2.5rem !important;
  }
}
</style>