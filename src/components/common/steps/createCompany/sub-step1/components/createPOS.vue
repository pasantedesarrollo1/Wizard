<template>
  <ion-card>
    <ion-card-content>
      <ion-list>
        <!-- Nombre Comercial -->
        <ion-item>
          <ion-label position="stacked">Nombre del Punto de Venta</ion-label>
          <ion-input
            type="text"
            placeholder="Nombre del punto de venta"
            fill="outline"
          ></ion-input>
        </ion-item>
        
        <!-- Codigo del Punto de Venta -->
        <ion-item>
          <ion-label position="stacked">Código del Punto de Venta</ion-label>
          <ion-input
            type="text"
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