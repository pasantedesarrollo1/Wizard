<template>
    <ion-item lines="none">
      <ion-label>Parametro de busqueda</ion-label>
    </ion-item>
    
    <ion-grid>
      <ion-row>
        <ion-col size="6">
          <ion-button expand="block" fill="outline">
            Codigo
          </ion-button>
        </ion-col>
        <ion-col size="6">
          <ion-button expand="block" fill="outline">
            Nombre
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </template>
  
  <script setup lang="ts">
  import { IonItem, IonLabel, IonButton, IonGrid, IonRow, IonCol } from '@ionic/vue';
  </script>
  
  <style scoped>
  /* No additional styles needed as Ionic components provide styling */
  </style>