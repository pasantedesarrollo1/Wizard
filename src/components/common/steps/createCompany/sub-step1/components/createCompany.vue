<template>
  <form @submit.prevent class="form-container">
    <!-- RUC y Razón social en la misma fila -->
    <div class="form-row">
      <!-- RUC -->
      <div class="form-group">
        <ion-label position="stacked" class="form-label">RUC <span class="required">*</span></ion-label>
        <div class="input-container">
          <div class="input-icon">
            <Icon icon="mdi:file-document-outline" width="20" height="20" />
          </div>
          <input 
            type="text"
            v-model="data.ruc"
            class="form-input"
            :class="{ 
              'has-value': data.ruc.length > 0,
              'is-focused': focusedField === 'ruc'
            }"
            @focus="setFocus('ruc')"
            @blur="clearFocus"
            readonly
            disable
          >
        </div>
      </div>
      
      <!-- Razón social -->
      <div class="form-group">
        <ion-label position="stacked" class="form-label">Razón social <span class="required">*</span></ion-label>
        <div class="input-container">
          <div class="input-icon">
            <Icon icon="mdi:domain" width="20" height="20" />
          </div>
          <input 
            type="text"
            v-model="data.legalName"
            class="form-input"
            :class="{ 
              'has-value': data.legalName.length > 0,
              'is-focused': focusedField === 'razonSocial'
            }"
            @focus="setFocus('razonSocial')"
            @blur="clearFocus"
            readonly
            disable
          >
        </div>
      </div>
    </div>

    <!-- Nombre empresa -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Nombre de tu Empresa <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:office-building" width="20" height="20" />
        </div>
        <input 
          type="text"
          placeholder="Nombre de tu empresa"
          v-model="data.name"
          @input="handleNameCompanyInput"
          class="form-input"
          :class="{ 
            'has-value': data.name.length > 0,
            'is-focused': focusedField === 'nombreEmpresa'
          }"
          @focus="setFocus('nombreEmpresa')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Dirección de la Empresa -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Dirección de tu Empresa <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:map-marker" width="20" height="20" />
        </div>
        <input 
          type="text"
          placeholder="Dirección de tu empresa"
          v-model="data.address"
          class="form-input"
          :class="{ 
            'has-value': data.address.length > 0,
            'is-focused': focusedField === 'direccion'
          }"
          @focus="setFocus('direccion')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Teléfonos -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Teléfonos de tu empresa <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:phone" width="20" height="20" />
        </div>
        <input 
          type="tel"
          placeholder="+593"
          v-model="data.phone"
          @input="handlePhoneInput"
          class="form-input"
          :class="{ 
            'has-value': data.phone.length > 0,
            'is-focused': focusedField === 'telefono'
          }"
          @focus="setFocus('telefono')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Correo Electrónico Empresarial - MODIFICADO CON VALIDACIÓN EN TIEMPO REAL -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Correo Electrónico Empresarial <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:email" width="20" height="20" />
        </div>
        <input 
          type="email"
          placeholder="Email empresarial"
          v-model="data.businessEmail"
          @input="handleEmailInput"
          class="form-input"
          :class="{ 
            'has-value': data.businessEmail.length > 0,
            'is-focused': focusedField === 'businessEmail',
            'valid-email': emailIsValid && data.businessEmail.length > 0,
            'invalid-email': !emailIsValid && data.businessEmail.length > 0
          }"
          @focus="setFocus('businessEmail')"
          @blur="clearFocus"
        >
      </div>
      <!-- Mensaje de error para email inválido -->
      <div v-if="!emailIsValid && data.businessEmail.length > 0" class="email-error-message">
        Por favor, ingrese un correo electrónico válido
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonLabel } from '@ionic/vue';
import { Icon } from '@iconify/vue';
import { useInitialData } from "@/composables/useInitialData";
import { 
  allowOnlyLettersSpacesAndNumbers,
  formatPhoneNumber,
  validateEmailInRealTime
} from "@/utils/input-controls";


const handleNameCompanyInput = (event: Event) => {
  data.value.name = allowOnlyLettersSpacesAndNumbers(event);
};

const handlePhoneInput = (event: Event) => {
  data.value.phone = formatPhoneNumber(event);
};

// Nuevo manejador para la validación de email en tiempo real
const handleEmailInput = (event: Event) => {
  // Usar la función de validación en tiempo real
  const result = validateEmailInRealTime(event);
  data.value.businessEmail = result.value;
  emailIsValid.value = result.isValid;
};

// Valores iniciales para el formulario
const initialValues = {
  ruc: '',
  name: '',
  legalName: '',
  address: '',
  phone: '',
  businessEmail: ''
};

// Usar el composable useInitialData para manejar los datos
const { data } = useInitialData(
  "companyCreation",
  initialValues,
  {
    autoSave: true,
    debug: false
  }
);

// Variable para controlar qué campo está enfocado
const focusedField = ref('');

// Nueva variable para controlar la validez del email
const emailIsValid = ref(true);

// Funciones para manejar el enfoque
const setFocus = (fieldName: string) => {
  focusedField.value = fieldName;
};

const clearFocus = () => {
  focusedField.value = '';
};
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

/* Estilos para inputs de solo lectura */
.form-input[readonly] {
  background-color: #f5f5f5;
  color: #666;
}

/* Estilos para validación de email - NUEVOS */
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
</style>