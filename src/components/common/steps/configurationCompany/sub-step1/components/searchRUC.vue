<template>
    <ion-item lines="none" class="ion-margin-vertical">
      <ion-label position="stacked">Consulta tu RUC</ion-label>
      <div class="ruc-search-container">
        <ion-input
          id="ruc"
          type="text"
          placeholder="Ingresa tu RUC"
          fill="outline"
          v-model="rucValue"
        ></ion-input>
        <ion-button size="default" @click="searchRuc">
          <ion-icon slot="start" :icon="searchOutline"></ion-icon>
          Buscar
        </ion-button>
      </div>
    </ion-item>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/vue';
  import { searchOutline } from 'ionicons/icons';
  
  const rucValue = ref('');
  
  const searchRuc = () => {
    console.log('Buscando RUC:', rucValue.value);
    // Aquí iría la lógica para buscar el RUC
  };
  </script>
  
  <style scoped>
  .ruc-search-container {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin-top: 8px;
  }
  
  ion-input {
    flex: 1;
  }
  </style>