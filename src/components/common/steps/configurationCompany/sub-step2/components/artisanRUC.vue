<template>
  <ion-list>
    <ion-item>
      <ion-checkbox 
        slot="start"
        v-model="isArtesano"
      ></ion-checkbox>
      <ion-label>Artesano</ion-label>
    </ion-item>
    
    <ion-item v-if="isArtesano">
      <ion-label>#</ion-label>
      <ion-input
        id="artisan-code"
        type="text"
        placeholder="Ingresa tu código de artesano"
        v-model="artisanCode"
      ></ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonCheckbox, IonInput } from '@ionic/vue';
import { ref } from 'vue';

// Reactive state for checkbox and input values
const isArtesano = ref(false);
const artisanCode = ref('');
</script>

<style scoped>
/* No additional styles needed as Ionic components provide styling */
</style>