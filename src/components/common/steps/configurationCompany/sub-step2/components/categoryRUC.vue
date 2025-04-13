<template>
  <ion-item>
    <ion-label>Categoria: </ion-label>
    <ion-input v-model="categoria" readonly></ion-input>
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
/* Estilos básicos similares al componente informationRUC */
ion-label {
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
}

/* Método 1: Usando CSS personalizado para el componente ion-item */
:deep(.item-inner) {
  padding-right: 0 !important;
}

/* Método 2: Usando variables CSS de Ionic */
ion-item {
  --inner-padding-end: 0px;
}

ion-input {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  --padding-start: 0.5rem;
}
</style>