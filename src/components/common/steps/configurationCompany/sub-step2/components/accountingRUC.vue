<template>
    <span >Si eres agente de retención es opcional llevar contabilidad</span>
  <ion-list>      
    <ion-item>
      <ion-checkbox 
        slot="start"
        v-model="isAccountingRequired"
        @ionChange="updateStore"
      ></ion-checkbox>
      <ion-label>Obligado a llevar contabilidad</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/vue';  
import { ref, onMounted, watch } from 'vue';
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Variable reactiva para el estado del checkbox
const isAccountingRequired = ref(false);

// Función para actualizar el store cuando cambia el checkbox
const updateStore = () => {
  // Obtener el objeto taxAgent actual para no perder otros valores
  const companyConfig = wizardStore.getStepData("companyConfig");
  const currentTaxAgent = companyConfig?.taxAgent || {};
  
  // Actualizar solo la propiedad accountingRequired
  wizardStore.updateFormSection("companyConfig", {
    taxAgent: {
      ...currentTaxAgent,
      accountingRequired: isAccountingRequired.value
    }
  });
};

// Cargar datos del store al montar el componente
onMounted(() => {
  const companyConfig = wizardStore.getStepData("companyConfig");
  if (companyConfig && companyConfig.taxAgent) {
    isAccountingRequired.value = companyConfig.taxAgent.accountingRequired || false;
  }
});

// Observar cambios en el store para actualizar el checkbox
watch(
  () => wizardStore.getStepData("companyConfig")?.taxAgent?.accountingRequired,
  (newValue) => {
    if (newValue !== undefined) {
      isAccountingRequired.value = newValue;
    }
  }
);
</script>

<style scoped>
/* No additional styles needed as Ionic components provide styling */
</style>