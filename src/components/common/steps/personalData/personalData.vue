<template>
  <div class="w-full flex justify-center">
    <ion-card class="wizard-card main-container">
      <ion-card-content class="wizard-content">
        <div class="pb-5">
          <form @submit.prevent class="form-container">
            <!-- Tipo de identificación -->
            <div class="form-row">
              <div class="form-group">
                <ion-label position="stacked" class="form-label">Tipo de Identificación <span class="required">*</span></ion-label>
                <div class="input-container">
                  <div class="input-icon">
                    <Icon icon="mdi:cards" width="20" height="20" />
                  </div>
                  <select 
                    v-model="data.identification.type" 
                    class="form-input"
                    :class="{ 
                      'has-value': data.identification.type.length > 0,
                      'is-focused': focusedField === 'tipoID'
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
                </div>
              </div>
              
              <div class="form-group">
                <ion-label position="stacked" class="form-label">Número de Identificación <span class="required">*</span></ion-label>
                <div class="input-container">
                  <div class="input-icon">
                    <Icon icon="mdi:card-account-details-outline" width="20" height="20" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Número de identificación"
                    v-model="data.identification.number"
                    @input="handleIdentificationNumberInput"
                    class="form-input"
                    :class="{ 
                      'has-value': data.identification.number.length > 0,
                      'is-focused': focusedField === 'identificacion',
                      'disabled': !data.identification.type
                    }"
                    @focus="setFocus('identificacion')"
                    @blur="clearFocus"
                    :disabled="!data.identification.type"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- Nombres -->
            <div class="form-group">
              <ion-label position="stacked" class="form-label">Nombres <span class="required">*</span></ion-label>
              <div class="input-container">
                <div class="input-icon">
                  <Icon icon="mdi:account" width="20" height="20" />
                </div>
                <input 
                  type="text"
                  placeholder="Ingresa tus Nombres"
                  v-model="data.name.first"
                  @input="handleNameInput"
                  class="form-input"
                  :class="{ 
                    'has-value': data.name.first.length > 0,
                    'is-focused': focusedField === 'nombres'
                  }"
                  @focus="setFocus('nombres')"
                  @blur="clearFocus"
                  required
                >
              </div>
            </div>

            <!-- Apellidos -->
            <div class="form-group">
              <ion-label position="stacked" class="form-label">Apellidos <span class="required">*</span></ion-label>
              <div class="input-container">
                <div class="input-icon">
                  <Icon icon="mdi:account-outline" width="20" height="20" />
                </div>
                <input 
                  type="text"
                  placeholder="Ingresa tus Apellidos"
                  v-model="data.name.last"
                  @input="handleLastInput"
                  class="form-input"
                  :class="{ 
                    'has-value': data.name.last.length > 0,
                    'is-focused': focusedField === 'apellidos'
                  }"
                  @focus="setFocus('apellidos')"
                  @blur="clearFocus"
                  required
                >
              </div>
            </div>

            <!-- Correo Electrónico -->
            <div class="form-group">
              <ion-label position="stacked" class="form-label">Correo Electrónico <span class="required">*</span></ion-label>
              <div class="input-container">
                <div class="input-icon">
                  <Icon icon="mdi:email" width="20" height="20" />
                </div>
                <input 
                  type="email"
                  placeholder="Email"
                  v-model="data.contact.email"
                  @input="handleEmailInput"
                  class="form-input"
                  :class="{ 
                    'has-value': data.contact.email.length > 0,
                    'is-focused': focusedField === 'email',
                    'valid-email': emailIsValid && data.contact.email.length > 0,
                    'invalid-email': !emailIsValid && data.contact.email.length > 0
                  }"
                  @focus="setFocus('email')"
                  @blur="clearFocus"
                  required
                >
              </div>
              <!-- Mensaje de error para email inválido -->
              <div v-if="!emailIsValid && data.contact.email.length > 0" class="email-error-message">
                Por favor, ingrese un correo electrónico válido
              </div>
            </div>

            <!-- Teléfono celular/whatsapp -->
            <div class="form-group">
              <ion-label position="stacked" class="form-label">Teléfono celular/whatsapp <span class="required">*</span></ion-label>
              <div class="input-container">
                <div class="input-icon">
                  <Icon icon="mdi:phone" width="20" height="20" />
                </div>
                <input 
                  type="tel"
                  placeholder="+593"
                  v-model="data.contact.phone"
                  @input="handlePhoneInput"
                  class="form-input"
                  :class="{ 
                    'has-value': data.contact.phone.length > 0,
                    'is-focused': focusedField === 'telefono'
                  }"
                  @focus="setFocus('telefono')"
                  @blur="clearFocus"
                  required
                >
              </div>
            </div>
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
  IonLabel,
} from '@ionic/vue';
import { Icon } from '@iconify/vue';
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

const selectedIdType = ref('');

watch(() => data.value.identification.type, (newType) => {
  selectedIdType.value = newType;
  data.value.identification.number = '';
});

// Manejador de input para el número de identificación que aplica validación según el tipo seleccionado
const handleIdentificationNumberInput = (event: Event) => {
  if (!selectedIdType.value) {
    const input = event.target as HTMLInputElement;
    data.value.identification.number = input.value.replace(/\D/g, '');
    return;
  }

  if (selectedIdType.value === 'ruc') {
    data.value.identification.number = formatEcuadorianId(event);
  } else if (selectedIdType.value === 'cedula') {
    data.value.identification.number = formatPhoneNumber(event);
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
  // Usar la función de validación en tiempo real
  const result = validateEmailInRealTime(event);
  data.value.contact.email = result.value;
  emailIsValid.value = result.isValid;
};

// Watch para limpiar el número de identificación si cambia el tipo
// watch(() => data.value.identification.type, () => {
//   // Limpiar el número de identificación cuando cambia el tipo
//   data.value.identification.number = '';
// });
</script>

<style scoped>
/* Contenedor del formulario */
.form-container {
  width: 100%;
}

/* Fila de formulario para elementos en línea */
.form-row {
  display: flex;
  gap: 12px;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 16px;
  }
}

/* Grupo de formulario */
.form-group {
  width: 100%;
}

/* Etiqueta de formulario */
.form-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

/* Indicador de campo requerido */
.required {
  color: var(--ion-color-primary);
}

/* Contenedor de input con icono */
.input-container {
  position: relative;
  width: 100%;
}

/* Icono dentro del input */
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 1;
}

/* Estilos del input */
.form-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  transition: all 0.3s ease;
  appearance: none;
}

.form-input:hover {
  border-color: #aaa;
}

.form-input.has-value {
  background-color: rgba(var(--ion-color-primary-rgb), 0.05);
  border-color: var(--ion-color-primary);
}

.form-input.is-focused {
  border-color: var(--ion-color-primary);
  border-width: 2px;
  box-shadow: 0 0 0 2px rgba(var(--ion-color-primary-rgb), 0.1);
}

.form-input::placeholder {
  color: #999;
}

/* Estilos para inputs deshabilitados */
.form-input:disabled, .form-input.disabled {
  background-color: #f5f5f5;
  color: #666;
  cursor: not-allowed;
  opacity: 0.7;
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
</style>