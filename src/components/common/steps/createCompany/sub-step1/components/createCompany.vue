<template>
  <ion-list class="ion-padding">
    <!-- Nombre empresa (central.illarli)-->
    <ion-item>
      <ion-label position="stacked">Nombre de tu Empresa</ion-label>
      <ion-input
        type="text"
        placeholder="Nombre de tu empresa"
        fill="outline"
      ></ion-input>
    </ion-item>

    <!-- RUC (central y sistema .illarli)-->
    <ion-item>
      <ion-label position="stacked">RUC</ion-label>
      <ion-input
        type="text"
        fill="outline"
      ></ion-input>
    </ion-item>

    <!-- Razon social (sistema.illarli)-->
    <ion-item>
      <ion-label position="stacked">Razón social</ion-label>
      <ion-input
        type="text"
        fill="outline"
      ></ion-input>
    </ion-item>

    <!-- Dirección de la Empresa -->
    <ion-item>
      <ion-label position="stacked">Dirección de tu Empresa</ion-label>
      <ion-input
        type="text"
        placeholder="Dirección de tu empresa"
        fill="outline"
      ></ion-input>
    </ion-item>

    <!-- Teléfonos -->
    <ion-item>
      <ion-label position="stacked">Teléfonos de tu empresa</ion-label>
      <ion-input
        type="tel"
        fill="outline"
      ></ion-input>
    </ion-item>

    <!-- Correo Electrónico -->
    <ion-item>
      <ion-label position="stacked">Correo Electrónico Empresarial</ion-label>
      <ion-input
        type="email"
        fill="outline"
      ></ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInput 
} from '@ionic/vue';
</script>

<style scoped>
ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 16px;
}

ion-input {
  margin-top: 8px;
}
</style>