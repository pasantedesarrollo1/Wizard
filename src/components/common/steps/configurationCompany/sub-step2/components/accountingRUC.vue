<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <span class="text-sm text-gray-700">Si eres agente de retención es opcional llevar contabilidad</span>
    <ion-list class="mt-2">      
      <ion-item>
        <ion-checkbox 
          slot="start"
          v-model="data.taxAgent.accountingRequired"
        ></ion-checkbox>
        <ion-label>Obligado a llevar contabilidad</ion-label>
      </ion-item>
    </ion-list>
  </div>
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