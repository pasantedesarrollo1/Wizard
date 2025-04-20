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
          v-model="data.pointOfSale.name"
          class="form-input"
          :class="{ 
            'has-value': data.pointOfSale.name.length > 0,
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
          v-model="data.pointOfSale.idPos"
          class="form-input"
          :class="{ 
            'has-value': data.pointOfSale.idPos.length > 0,
            'is-focused': focusedField === 'codigoPOS'
          }"
          @focus="setFocus('codigoPOS')"
          @blur="clearFocus"
          disabled
        >
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonLabel } from '@ionic/vue';
import { Icon } from '@iconify/vue';
import { useInitialData } from "@/composables/useInitialData";

// Valores iniciales para el formulario
const initialValues = {
  pointOfSale: {
    idPos: '010',
    name: ''
  }
};

// Usar el composable useInitialData para manejar los datos
const { data } = useInitialData(
  "branchAndPOS",
  initialValues,
  {
    autoSave: true,
    debug: false,
    nestedFields: {
      pointOfSale: ["idPos", "name"]
    }
  }
);

// Variable para controlar qué campo está enfocado
const focusedField = ref('');

// Funciones para manejar el enfoque
const setFocus = (fieldName: string) => {
  focusedField.value = fieldName;
};

const clearFocus = () => {
  focusedField.value = '';
};

// Asegurar que el valor '010' se establezca al montar el componente
onMounted(() => {
  if (!data.value.pointOfSale.idPos) {
    data.value.pointOfSale.idPos = '010';
  }
});
</script>

<style scoped>
/* Contenedor del formulario */
.form-container {
  width: 100%;
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

/* Estilos para inputs deshabilitados */
.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.8;
}
</style>