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
            v-model="ruc"
            class="form-input"
            :class="{ 
              'has-value': ruc.length > 0,
              'is-focused': focusedField === 'ruc'
            }"
            @focus="setFocus('ruc')"
            @blur="clearFocus"
            readonly
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
            v-model="razonSocial"
            class="form-input"
            :class="{ 
              'has-value': razonSocial.length > 0,
              'is-focused': focusedField === 'razonSocial'
            }"
            @focus="setFocus('razonSocial')"
            @blur="clearFocus"
            readonly
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
          v-model="nombreEmpresa"
          class="form-input"
          :class="{ 
            'has-value': nombreEmpresa.length > 0,
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
          v-model="direccion"
          class="form-input"
          :class="{ 
            'has-value': direccion.length > 0,
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
          v-model="telefono"
          class="form-input"
          :class="{ 
            'has-value': telefono.length > 0,
            'is-focused': focusedField === 'telefono'
          }"
          @focus="setFocus('telefono')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Correo Electrónico -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Correo Electrónico Empresarial <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:email" width="20" height="20" />
        </div>
        <input 
          type="email"
          placeholder="Email empresarial"
          v-model="email"
          class="form-input"
          :class="{ 
            'has-value': email.length > 0,
            'is-focused': focusedField === 'email'
          }"
          @focus="setFocus('email')"
          @blur="clearFocus"
        >
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useWizardStore } from "@/stores/wizardStore";
import {IonLabel} from '@ionic/vue';
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
</style>