<template>
  <ion-grid>
    <ion-row>
      <ion-col size="6">
      <span>Selecciona si necesitas despacho posterior                   
      </span>
        <ion-item>
          <ion-checkbox 
          slot="start"
          v-model="data.branch.delayedDispatch"
          ></ion-checkbox>
          <ion-label>Despacho posterior</ion-label>
        </ion-item>
      </ion-col>
      <ion-col size="6">
      <span>Selecciona si tu empresa es establecimiento Turistico</span>
        <ion-item>
          <ion-checkbox 
          slot="start"
          v-model="data.branch.isTouristEstablishment"
          ></ion-checkbox>
          <ion-label>Establecimiento Turistico</ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonCheckbox } from "@ionic/vue"
import { useInitialData } from "@/composables/useInitialData"

// Valores iniciales para el formulario
const initialValues = {
  branch: {
    delayedDispatch: false,
    isTouristEstablishment: false,
    // Incluimos campos vacíos para otros valores que puedan existir en branch
    idBranch: "",
    commercialName: "",
    address: ""
  }
};

// Usar el composable useInitialData para manejar los datos
const { data } = useInitialData(
  "branchAndPOS",
  initialValues,
  {
    autoSave: true,
    debug: false,
    nestedFields: {
      branch: ["delayedDispatch", "isTouristEstablishment", "idBranch", "commercialName", "address"]
    }
  }
);
</script>

<style scoped>
/* Ensure items take full width within columns */
ion-item {
  --padding-start: 0;
}
</style>