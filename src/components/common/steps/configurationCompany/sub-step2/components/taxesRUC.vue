<template>
    <ion-item lines="none">
      <ion-label>Impuestos a manejar</ion-label>
    </ion-item>
    
    <ion-grid>
      <ion-row>
        <ion-col size="4">
          <ion-button expand="block" fill="outline">
            15 %
          </ion-button>
        </ion-col>
        <ion-col size="4">
          <ion-button expand="block" fill="outline">
            5 %
          </ion-button>
        </ion-col>
        <ion-col size="4">
          <ion-button expand="block" fill="outline">
            0 %
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    
    <ion-item>
      <ion-label>#</ion-label>
      <ion-input
        id="tax-code"
        type="text"
        placeholder=" ingresa tu codigo para 5%"
      ></ion-input>
    </ion-item>
  </template>
  
  <script setup lang="ts">
  import { IonItem, IonLabel, IonButton, IonGrid, IonRow, IonCol, IonInput } from '@ionic/vue';
  </script>
  
  <style scoped>
  /* No additional styles needed as Ionic components provide styling */
  </style>