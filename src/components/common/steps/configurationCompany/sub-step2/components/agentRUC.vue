<template>
    <ion-list>
      <ion-item>
        <ion-checkbox slot="start"></ion-checkbox>
        <ion-label>Agente de retencion</ion-label>
      </ion-item>
      
      <ion-item>
        <ion-checkbox slot="start"></ion-checkbox>
        <ion-label>Obligado a llevar contabiliad</ion-label>
      </ion-item>
    </ion-list>
  </template>
  
  <script setup lang="ts">
  import { IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/vue';
  </script>
  
  <style scoped>
  /* No additional styles needed as Ionic components provide styling */
  </style>