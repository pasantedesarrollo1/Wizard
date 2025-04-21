<template>
    <div class="form-group">
      <ion-label v-if="label" position="stacked" class="form-label">
        {{ label }} <span v-if="required" class="required">*</span>
      </ion-label>
      <div class="input-container">
        <div v-if="icon" class="input-icon">
          <Icon :icon="icon" width="20" height="20" />
        </div>
        
        <!-- Input estándar para la mayoría de tipos -->
        <input
          v-if="type !== 'select' && type !== 'textarea'"
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          class="form-input"
          :class="{ 
            'has-value': modelValue && modelValue.length > 0,
            'is-focused': isFocused,
            'valid-input': isValid && modelValue && modelValue.length > 0,
            'invalid-input': !isValid && modelValue && modelValue.length > 0
          }"
          @input="handleInput"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
        />
        
        <!-- Select para opciones -->
        <select
          v-else-if="type === 'select'"
          :id="id"
          :value="modelValue"
          :disabled="disabled"
          :required="required"
          class="form-input"
          :class="{ 
            'has-value': modelValue && modelValue.length > 0,
            'is-focused': isFocused
          }"
          @input="handleInput"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
        >
          <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
          <slot></slot>
        </select>
        
        <!-- Textarea para texto multilínea -->
        <textarea
          v-else
          :id="id"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          class="form-input textarea"
          :class="{ 
            'has-value': modelValue && modelValue.length > 0,
            'is-focused': isFocused
          }"
          @input="handleInput"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
        ></textarea>
      </div>
      
      <!-- Mensaje de error -->
      <div v-if="!isValid && modelValue && modelValue.length > 0" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonLabel } from '@ionic/vue';
  import { Icon } from '@iconify/vue';
  
  // Definir props
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    validator: {
      type: Function,
      default: null
    },
    errorMessage: {
      type: String,
      default: 'Este campo no es válido'
    }
  });
  
  // Definir eventos
  const emit = defineEmits(['update:modelValue', 'validation']);
  
  // Estado local
  const isFocused = ref(false);
  const isValid = ref(true);
  
  // Manejar el foco
  const setFocus = (focused: boolean) => {
    isFocused.value = focused;
  };
  
  // Manejar la entrada con validación
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value = target.value;
  
    // Validar si hay una función de validación
    if (props.validator) {
      const validationResult = props.validator(event);
  
      if (typeof validationResult === 'object' && validationResult !== null) {
        // Si el validador devuelve un objeto con value e isValid
        isValid.value = validationResult.isValid;
        emit('update:modelValue', validationResult.value);
        emit('validation', isValid.value);
      } else if (typeof validationResult === 'string') {
        // Si el validador solo devuelve el valor como string
        isValid.value = true;
        emit('update:modelValue', validationResult);
        emit('validation', isValid.value);
      } else {
        // Caso de fallback
        isValid.value = true;
        emit('update:modelValue', value);
        emit('validation', isValid.value);
      }
    } else {
      // Sin validación personalizada
      isValid.value = true;
      emit('update:modelValue', value);
      emit('validation', isValid.value);
    }
  };
  </script>
  
  <style scoped>
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
    font-family: inherit;
  }
  
  /* Ajuste para inputs sin icono */
  .input-container:not(:has(.input-icon)) .form-input {
    padding-left: 12px;
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
  .form-input:disabled,
  .form-input[readonly] {
    background-color: #f5f5f5;
    color: #666;
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  /* Estilos para textarea */
  .form-input.textarea {
    min-height: 100px;
    resize: vertical;
    padding-top: 10px;
  }
  
  /* Estilos para validación */
  .valid-input {
    background-color: rgba(16, 185, 129, 0.05) !important;
  }
  
  .invalid-input {
    border-color: #ef4444 !important;
    background-color: rgba(239, 68, 68, 0.05) !important;
  }
  
  .error-message {
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    padding-left: 0.5rem;
  }
  </style>