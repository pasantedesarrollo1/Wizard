<template>
  <ion-item class="info-item">
    <ion-label class="info-label text-gray-500">Categoria: </ion-label>
    <ion-input class="info-input text-gray-500" v-model="categoria" readonly></ion-input>
  </ion-item>
</template>
    
<script setup lang="ts">
import { IonItem, IonLabel, IonInput } from "@ionic/vue";
import { ref, onMounted, watch } from 'vue';
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Variable reactiva para almacenar el valor del régimen
const categoria = ref('');

// Cargar datos del store si existen
onMounted(() => {
  const companyConfig = wizardStore.getStepData("companyConfig");
  if (companyConfig && companyConfig.categoryRUC) {
    categoria.value = companyConfig.categoryRUC;
  }
});

// Observar cambios en el valor para actualizar el store
watch(categoria, (newValue) => {
  wizardStore.updateFormSection("companyConfig", { categoryRUC: newValue });
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