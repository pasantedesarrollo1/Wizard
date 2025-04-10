<template>
  <ion-card>
    <ion-card-content>
      <ion-list>
        <!-- Nombre sucursal (central.illarli) -->
        <ion-item>
          <ion-label position="stacked">Nombre de tu Sucursal</ion-label>
          <ion-input
            type="text"
            placeholder="Nombre de la sucursal"
            fill="outline"
          ></ion-input>
        </ion-item>
        
        <!-- Nombre Comercial (sistema y central.illarli) -->
        <ion-item>
          <ion-label position="stacked">Nombre Comercial</ion-label>
          <ion-input
            type="text"
            placeholder="Nombre comercial"
            fill="outline"
          ></ion-input>
        </ion-item>
        
        <!-- Codigo de la sucursal (sistema y central.illarli) -->
        <ion-item>
          <ion-label position="stacked">Código de Sucursal</ion-label>
          <ion-input
            type="text"
            fill="outline"
          ></ion-input>
        </ion-item>
        
        <!-- Direccion de la sucursal (sistema y central.illarli) -->
        <ion-item>
          <ion-label position="stacked">Dirección de la Sucursal</ion-label>
          <ion-input
            type="text"
            fill="outline"
          ></ion-input>
        </ion-item>
        
        <!-- Telefono de la sucursal (central.illarli) -->
        <ion-item>
          <ion-label position="stacked">Teléfono de la sucursal</ion-label>
          <ion-input
            type="tel"
            fill="outline"
          ></ion-input>
        </ion-item>
        
        <!-- Correo de la sucursal (central.illarli) -->
        <ion-item>
          <ion-label position="stacked">Correo de la Sucursal</ion-label>
          <ion-input
            type="email"
            fill="outline"
          ></ion-input>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { 
  IonCard,
  IonCardContent,
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

ion-card {
  margin: 0;
  box-shadow: none;
}
</style>