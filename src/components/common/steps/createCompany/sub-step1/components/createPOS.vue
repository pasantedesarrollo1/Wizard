<template>
  <form @submit.prevent class="form-container">
    <!-- Nombre del Punto de Venta -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Nombre del Punto de Emisión <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:store" width="20" height="20" />
        </div>
        <input 
          type="text"
          placeholder="Nombre del punto de Emisión"
          v-model="nombrePOS"
          class="form-input"
          :class="{ 
            'has-value': nombrePOS.length > 0,
            'is-focused': focusedField === 'nombrePOS'
          }"
          @focus="setFocus('nombrePOS')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Código del Punto de Venta -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Código del Punto de Emisión <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:barcode" width="20" height="20" />
        </div>
        <input 
          type="text"
          placeholder="Código del punto de Emisión"
          v-model="codigoPOS"
          class="form-input"
          :class="{ 
            'has-value': codigoPOS.length > 0,
            'is-focused': focusedField === 'codigoPOS'
          }"
          @focus="setFocus('codigoPOS')"
          @blur="clearFocus"
        >
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {

  IonLabel,
} from '@ionic/vue';
import { Icon } from '@iconify/vue'; // Importación de Iconify

// Variables reactivas para almacenar los valores de los campos
const nombrePOS = ref('');
const codigoPOS = ref('');

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

<style scoped>
/* Contenedor del formulario */
.form-container {
  width: 100%;
}

/* Grupo de formulario */
.form-group {
  margin-bottom: 16px;
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
</style>