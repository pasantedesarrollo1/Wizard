<template>
  <form @submit.prevent class="form-container">
    <!-- Nombre Comercial y Código de Sucursal en la misma fila -->
    <div class="form-row">
      <!-- Nombre Comercial -->
      <div class="form-group">
        <ion-label position="stacked" class="form-label">Nombre Comercial <span class="required">*</span></ion-label>
        <div class="input-container">
          <div class="input-icon">
            <Icon icon="mdi:store-marker" width="20" height="20" />
          </div>
          <input 
            type="text"
            v-model="data.branch.commercialName"
            class="form-input"
            :class="{ 
              'has-value': data.branch.commercialName.length > 0,
              'is-focused': focusedField === 'nombreComercial'
            }"
            @focus="setFocus('nombreComercial')"
            @blur="clearFocus"
          >
        </div>
      </div>

      <!-- Código de Sucursal -->
      <div class="form-group">
        <ion-label position="stacked" class="form-label">Código de la Matriz <span class="required">*</span></ion-label>
        <div class="input-container">
          <div class="input-icon">
            <Icon icon="mdi:barcode" width="20" height="20" />
          </div>
          <input 
            type="text"
            readonly
            disable
            v-model="data.branch.idBranch"
            class="form-input"
            :class="{ 
              'has-value': data.branch.idBranch.length > 0,
              'is-focused': focusedField === 'codigoSucursal'
            }"
            @focus="setFocus('codigoSucursal')"
            @blur="clearFocus"
          >
        </div>
      </div>
    </div>

    <!-- Nombre de tu Sucursal -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Nombre de la Matriz <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:home-city" width="20" height="20" />
        </div>
        <input 
          type="text"
          placeholder="Nombre de la matriz"
          v-model="data.branch.name"
          class="form-input"
          :class="{ 
            'has-value': data.branch.name.length > 0,
            'is-focused': focusedField === 'nombreSucursal'
          }"
          @focus="setFocus('nombreSucursal')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Dirección de la Sucursal -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Dirección de la Matriz <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:map-marker" width="20" height="20" />
        </div>
        <input 
          type="text"
          v-model="data.branch.address"
          class="form-input"
          :class="{ 
            'has-value': data.branch.address.length > 0,
            'is-focused': focusedField === 'direccionSucursal'
          }"
          @focus="setFocus('direccionSucursal')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Teléfono de la sucursal -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Teléfono de la Matriz<span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:phone" width="20" height="20" />
        </div>
        <input 
          type="tel"
          placeholder="+593"
          v-model="data.branch.phone"
          @input="handlePhoneInput"
          class="form-input"
          :class="{ 
            'has-value': data.branch.phone.length > 0,
            'is-focused': focusedField === 'telefonoSucursal'
          }"
          @focus="setFocus('telefonoSucursal')"
          @blur="clearFocus"
        >
      </div>
    </div>

    <!-- Correo de la Sucursal -->
    <div class="form-group">
      <ion-label position="stacked" class="form-label">Correo de la Matriz <span class="required">*</span></ion-label>
      <div class="input-container">
        <div class="input-icon">
          <Icon icon="mdi:email" width="20" height="20" />
        </div>
        <input 
          type="email"
          placeholder="Email de la Matriz"
          v-model="data.branch.email"
          class="form-input"
          :class="{ 
            'has-value': data.branch.email.length > 0,
            'is-focused': focusedField === 'correoSucursal'
          }"
          @focus="setFocus('correoSucursal')"
          @blur="clearFocus"
        >
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
  formatPhoneNumber,
} from "@/utils/input-controls";


const handlePhoneInput = (event: Event) => {
  data.value.branch.phone = formatPhoneNumber(event);
};

// Valores iniciales para el formulario
const initialValues = {
  branch: {
    commercialName: '',
    idBranch: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    // Incluimos campos que pueden existir en otras partes del código
    delayedDispatch: false,
    isTouristEstablishment: false
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
      branch: ["commercialName", "idBranch", "name", "address", "phone", "email", "delayedDispatch", "isTouristEstablishment"]
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