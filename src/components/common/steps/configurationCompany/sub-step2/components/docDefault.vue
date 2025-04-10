<template>
    <ion-item lines="none">
      <ion-label>Documento por defecto</ion-label>
    </ion-item>
    
    <ion-grid>
      <ion-row>
        <ion-col size="6">
          <ion-button expand="block" fill="outline">
            Facturas electrónicas
          </ion-button>
        </ion-col>
        <ion-col size="6">
          <ion-button expand="block" fill="outline">
            Recibos
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