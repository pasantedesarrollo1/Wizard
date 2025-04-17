<template>
  <span>Si eres agente de retención es opcional llevar contabilidad</span>
  <ion-list>      
    <ion-item>
      <ion-checkbox 
        slot="start"
        v-model="data.taxAgent.accountingRequired"
      ></ion-checkbox>
      <ion-label>Obligado a llevar contabilidad</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/vue';  
import { useInitialData } from "@/composables/useInitialData";

// Valores iniciales para el formulario
const initialValues = {
  taxAgent: {
    accountingRequired: false,
    isAgent: false
  }
};

// Usar el composable useInitialData para manejar los datos
const { data } = useInitialData(
  "companyConfig",
  initialValues,
  {
    autoSave: true,
    debug: false,
    nestedFields: {
      taxAgent: ["accountingRequired", "isAgent"]
    }
  }
);
</script>

<style scoped>
/* No additional styles needed as Ionic components provide styling */
</style>