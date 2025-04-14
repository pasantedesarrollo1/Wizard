<template>
  <ion-item class="info-item">
    <ion-label class="info-label text-gray-500">Agente de retención: </ion-label>
    <ion-input class="info-input text-gray-500" v-model="agentValueText" readonly></ion-input>
  </ion-item>
</template>
    
<script setup lang="ts">
import { IonItem, IonLabel, IonInput } from "@ionic/vue";
import { ref, onMounted, watch } from 'vue';
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Variable reactiva para almacenar el valor textual (Si/No)
const agentValueText = ref('');
const companyConfig = ref(wizardStore.getStepData("companyConfig"));

// Función para convertir el booleano a texto
const booleanToText = (value: boolean | undefined): string => {
  if (value === undefined) return '';
  return value ? 'Si' : 'No';
};

// Cargar datos del store si existen
onMounted(() => {
  if (companyConfig.value && companyConfig.value.taxAgent) {
    agentValueText.value = booleanToText(companyConfig.value.taxAgent.isAgent);
  }
});

// Observar cambios en el store para actualizar el texto
watch(() => {
  companyConfig.value = wizardStore.getStepData("companyConfig");
  if (companyConfig.value && companyConfig.value.taxAgent) {
    return companyConfig.value.taxAgent.isAgent;
  }
  return undefined;
}, (newValue) => {
  agentValueText.value = booleanToText(newValue);
});
</script>
    
<style scoped>
/* Estilos unificados para componentes informativos */
.info-item {
  --inner-padding-end: 0;
  display: flex;
}

.info-label {
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
  flex: 3;
  min-width: 70%;
}

.info-input {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  --padding-start: 0.5rem;
  flex: 1;
  max-width: 80px;
}
</style>