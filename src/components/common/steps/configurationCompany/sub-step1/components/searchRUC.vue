<template>
  <ion-item lines="none" class="ion-margin-vertical custom-item">
    <ion-label position="stacked">RUC</ion-label>
    <div class="ruc-search-container">
      <div class="input-wrapper" :class="{ 'input-focused': isFocused }" @click="focusInput">
        <Icon icon="material-symbols:search" class="search-icon" />
        <input
          id="ruc"
          type="text"
          placeholder="Ingresa tu RUC"
          v-model="rucValue"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="native-input"
          ref="rucInput"
        />
      </div>
      <ion-button size="default" @click="searchRuc" class="consultar-button">
        Consultar
      </ion-button>
    </div>
  </ion-item>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { IonItem, IonLabel, IonButton } from '@ionic/vue';
import { Icon } from '@iconify/vue';

const rucValue = ref('');
const isFocused = ref(false);
// Corregir el tipo del ref para el input
const rucInput = ref<HTMLInputElement | null>(null);

// Definir los eventos que este componente puede emitir
const emit = defineEmits(['ruc-searched']);

const focusInput = () => {
  if (rucInput.value) {
    rucInput.value.focus();
  }
};

const searchRuc = () => {
  console.log('Buscando RUC:', rucValue.value);
  
  // En un caso real, aquí se haría una llamada a una API
  // Para este ejemplo, simulamos una respuesta con datos ficticios
  const rucData = {
    ruc: rucValue.value || '1792780241001',
    razonSocial: 'TODONEG S.A.',
    estado: 'ACTIVO'
  };
  
  // Emitir el evento con los datos del RUC
  emit('ruc-searched', rucData);
};
</script>

<style scoped>
.custom-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.ruc-search-container {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 12px;
  background-color: white;
  transition: all 0.2s ease;
  cursor: text;
}

.input-focused {
  border-color: #0054e9;
  box-shadow: 0 0 0 1px rgba(0, 84, 233, 0.2);
}

.search-icon {
  color: #757575;
  font-size: 18px;
  margin-right: 8px;
  width: 18px;
  height: 18px;
  pointer-events: none;
}

.native-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-family: inherit;
  color: #333;
  padding: 10px 0;
  width: 100%;
  caret-color: #0054e9; /* Color del cursor */
}

.native-input::placeholder {
  color: #757575;
  opacity: 1;
}

.consultar-button {
  --background: #0054e9;
  --color: white;
  --border-radius: 6px;
  --padding-start: 16px;
  --padding-end: 16px;
  height: 40px;
  text-transform: none;
  font-weight: 500;
}
</style>