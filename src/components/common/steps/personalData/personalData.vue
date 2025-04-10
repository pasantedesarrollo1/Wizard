<template>
  <ion-card class="personal-data-card">
    <ion-card-content class="scrollable-content">
      <form>
        <!-- Tipo de identificación -->
        <ion-item>
          <ion-label position="stacked">Tipo de Identificación</ion-label>
          <div class="ion-margin-top custom-select-input">
            <ion-select 
              v-model="tipoIDSeleccionado" 
              interface="popover" 
              placeholder="Seleccionar"
              fill="outline"
              class="id-type-select"
            >
              <ion-select-option 
                v-for="opcion in opcionesTipoID" 
                :key="opcion.value" 
                :value="opcion.value"
              >
                {{ opcion.label }}
              </ion-select-option>
            </ion-select>
            <ion-input
              type="text"
              placeholder="Ingresa tu Identificación"
              fill="outline"
              class="id-number-input"
            ></ion-input>
          </div>
        </ion-item>

        <!-- Nombres -->
        <ion-item>
          <ion-label position="stacked">Nombres</ion-label>
          <ion-input
            type="text"
            placeholder="Ingresa tus Nombres"
            fill="outline"
            class="ion-margin-top"
          ></ion-input>
        </ion-item>

        <!-- Apellidos -->
        <ion-item>
          <ion-label position="stacked">Apellidos</ion-label>
          <ion-input
            type="text"
            placeholder="Ingresa tus Apellidos"
            fill="outline"
            class="ion-margin-top"
          ></ion-input>
        </ion-item>

        <!-- Correo Electrónico -->
        <ion-item>
          <ion-label position="stacked">Correo Electrónico</ion-label>
          <ion-input
            type="email"
            placeholder="Email"
            fill="outline"
            class="ion-margin-top"
          ></ion-input>
        </ion-item>

        <!-- Teléfono celular/whatsapp -->
        <ion-item>
          <ion-label position="stacked">Teléfono celular/whatsapp</ion-label>
          <ion-input
            type="tel"
            placeholder="+593"
            fill="outline"
            class="ion-margin-top"
          ></ion-input>
        </ion-item>

        <!-- Rol en la empresa -->
        <ion-item>
          <ion-label position="stacked">Selecciona tu rol en la empresa</ion-label>
          <ion-select
            v-model="RolSeleccionado"
            interface="popover"
            placeholder="Seleccionar"
            fill="outline"
            class="ion-margin-top"
          >
            <ion-select-option
              v-for="opcion in opcionesRol"
              :key="opcion.value"
              :value="opcion.value"
            >
              {{ opcion.label }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </form>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/vue';

// Definimos la interfaz para las opciones de tipo de ID
interface TipoIDOpcion {
  label: string;
  value: string;
}
// Definimos la interfaz para las opciones de rol
interface RolOpcion {
  label: string;
  value: string;
}

// Array con las opciones de tipo de identificación
const opcionesTipoID = ref<TipoIDOpcion[]>([
  { label: 'Cédula', value: 'cedula' },
  { label: 'Consumidor Final', value: 'cf' },
  { label: 'Pasaporte/Identificación tributaria del exterior', value: 'pasaporte' },
  { label: 'Placa o RAMV/CPM', value: 'placa' },
  { label: 'RUC', value: 'ruc' }
]);

const opcionesRol = ref<RolOpcion[]>([
  { label: 'Gerente', value: 'gerente' },
  { label: 'Contador', value: 'contador' },
  { label: 'Dueño', value: 'dueno' },
  { label: 'Encargado', value: 'encargado' },
]);

// Variable para almacenar el tipo de ID seleccionado
const tipoIDSeleccionado = ref('');
const RolSeleccionado = ref('');
</script>

<style scoped>
.personal-data-card {
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scrollable-content {
  overflow-y: auto;
  max-height: 70vh; /* Altura máxima para permitir scroll */
  padding-bottom: 20px; /* Espacio adicional al final */
}

.custom-select-input {
  display: flex;
  gap: 10px;
}

.id-type-select {
  flex: 1;
  max-width: 33%;
}

.id-number-input {
  flex: 2;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 16px;
}

ion-select, ion-input {
  width: 100%;
}
</style>