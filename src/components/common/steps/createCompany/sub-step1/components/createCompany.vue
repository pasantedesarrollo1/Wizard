<template>
  <form @submit.prevent class="form-container">
    <!-- RUC y Razón social en la misma fila -->
    <div class="form-row">
      <!-- RUC -->
      <FormField
        v-model="data.ruc"
        label="RUC"
        icon="mdi:file-document-outline"
        placeholder="Número de RUC"
        required
        readonly
        disabled
        @validation="(isValid) => handleValidation('ruc', isValid)"
      />
      
      <!-- Razón social -->
      <FormField
        v-model="data.legalName"
        label="Razón social"
        icon="mdi:domain"
        placeholder="Razón social de la empresa"
        required
        readonly
        disabled
        @validation="(isValid) => handleValidation('legalName', isValid)"
      />
    </div>

    <!-- Nombre empresa -->
    <FormField
      v-model="data.name"
      label="Nombre de tu Empresa"
      icon="mdi:office-building"
      placeholder="Nombre de tu empresa"
      required
      @input="handleNameCompanyInput"
      @validation="(isValid) => handleValidation('name', isValid)"
    />

    <!-- Dirección de la Empresa -->
    <FormField
      v-model="data.address"
      label="Dirección de tu Empresa"
      icon="mdi:map-marker"
      placeholder="Dirección de tu empresa"
      required
      @validation="(isValid) => handleValidation('address', isValid)"
    />

    <!-- Teléfonos -->
    <FormField
      v-model="data.phone"
      label="Teléfonos de tu empresa"
      icon="mdi:phone"
      placeholder="+593"
      required
      @input="handlePhoneInput"
      @validation="(isValid) => handleValidation('phone', isValid)"
    />

    <!-- Correo Electrónico Empresarial -->
    <FormField
      v-model="data.businessEmail"
      label="Correo Electrónico Empresarial"
      icon="mdi:email"
      placeholder="Email empresarial"
      required
      @input="handleEmailInput"
      @validation="(isValid) => handleValidation('businessEmail', isValid)"
      :validator="validateEmailInput"
      errorMessage="Por favor, ingrese un correo electrónico válido"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormField from "@/components/ui/FormField.vue";
import { useInitialData } from "@/composables/useInitialData";
import { 
  allowOnlyLettersSpacesAndNumbers,
  formatPhoneNumber,
  validateEmailInRealTime
} from "@/utils/input-controls";

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

// Definir un tipo para las claves de validación
type ValidationKey = 'ruc' | 'name' | 'legalName' | 'address' | 'phone' | 'businessEmail';

// Estado para validación de campos con tipo explícito
const validationState = ref<Record<ValidationKey, boolean>>({
  ruc: true,
  name: true,
  legalName: true,
  address: true,
  phone: true,
  businessEmail: true
});

// Función para manejar eventos de validación con tipos correctos
const handleValidation = (field: ValidationKey, isValid: boolean) => {
  validationState.value[field] = isValid;
};

// Manejadores de eventos para los inputs con validación
const handleNameCompanyInput = (event: Event) => {
  // const input = event.target as HTMLInputElement;
  data.value.name = allowOnlyLettersSpacesAndNumbers(event);
};

const handlePhoneInput = (event: Event) => {
  data.value.phone = formatPhoneNumber(event);
};

const handleEmailInput = (event: Event) => {
  // Usar la función de validación en tiempo real
  const result = validateEmailInRealTime(event);
  data.value.businessEmail = result.value;
  // Actualizar el estado de validación
  handleValidation('businessEmail', result.isValid);
};
// Función de validación para el email que devuelve un objeto con value e isValid
const validateEmailInput = (event: Event) => {
  return validateEmailInRealTime(event);
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
  gap: 6px;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 6px;
  }
}
</style>