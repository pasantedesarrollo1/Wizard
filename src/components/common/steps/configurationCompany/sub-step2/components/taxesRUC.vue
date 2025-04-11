<template>
  <ion-item lines="none">
    <ion-label>Impuestos a manejar</ion-label>
  </ion-item>
  
  <ion-grid>
    <ion-row>
      <ion-col size="4">
        <ion-button 
          expand="block" 
          :fill="selectedTax === '15%' ? 'solid' : 'outline'"
          @click="selectTax('15%')"
        >
          15 %
        </ion-button>
      </ion-col>
      <ion-col size="4">
        <ion-button 
          expand="block" 
          :fill="selectedTax === '5%' ? 'solid' : 'outline'"
          @click="selectTax('5%')"
        >
          5 %
        </ion-button>
      </ion-col>
      <ion-col size="4">
        <ion-button 
          expand="block" 
          :fill="selectedTax === '0%' ? 'solid' : 'outline'"
          @click="selectTax('0%')"
        >
          0 %
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
  
  <ion-item v-if="selectedTax === '5%'">
    <ion-input
      id="tax-code"
      type="text"
      placeholder="Ingresa tu código para 5%"
      v-model="taxCode"
    ></ion-input>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonButton, IonGrid, IonRow, IonCol, IonInput } from '@ionic/vue';
import { ref } from 'vue';

// Reactive state for selected tax and input value
const selectedTax = ref('');
const taxCode = ref('');

// Function to handle tax selection
const selectTax = (tax: string) => {
  selectedTax.value = tax;
};
</script>

<style scoped>
/* No additional styles needed as Ionic components provide styling */
</style>