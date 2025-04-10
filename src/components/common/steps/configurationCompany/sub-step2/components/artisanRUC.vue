<template>
    <ion-list>
      <ion-item>
        <ion-checkbox slot="start"></ion-checkbox>
        <ion-label>Artesano</ion-label>
      </ion-item>
      
      <ion-item>
        <ion-label >#</ion-label>
        <ion-input
          id="artisan-code"
          type="text"
          placeholder=" ingresa tu codigo de artesano"
        ></ion-input>
      </ion-item>
    </ion-list>
  </template>
  
  <script setup lang="ts">
  import { IonList, IonItem, IonLabel, IonCheckbox, IonInput } from '@ionic/vue';
  </script>
  
  <style scoped>
  /* No additional styles needed as Ionic components provide styling */
  </style>