<template>
  <ion-grid>
    <ion-row>
      <ion-col size="6">
      <span>Selecciona si necesitas despacho posterior                   
      </span>
        <ion-item>
          <ion-checkbox slot="start"></ion-checkbox>
          <ion-label>Despacho posterior</ion-label>
        </ion-item>
      </ion-col>
      <ion-col size="6">
      <span>Selecciona si tu empresa es establecimiento Turistico</span>
        <ion-item>
          <ion-checkbox slot="start"></ion-checkbox>
          <ion-label>Establecimiento Turistico</ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonCheckbox } from '@ionic/vue';
</script>

<style scoped>
/* Ensure items take full width within columns */
ion-item {
  --padding-start: 0;
}
</style>