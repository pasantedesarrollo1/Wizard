<template>
  <ion-item class="info-item">
    <div class="label-container">
      <ion-label class="info-label text-gray-500">Categoria: </ion-label>
    </div>
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
  let companyConfig;
  try {
    companyConfig = wizardStore.getStepData("companyConfig");
  } catch (error) {
    console.error("Error getting company config:", error);
    companyConfig = null; // or some default value
  }
  if (companyConfig && companyConfig.categoryRUC) {
    categoria.value = companyConfig.categoryRUC;
  } else {
    categoria.value = '';
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
  align-items: center;
}

/* Contenedor para el label con ancho fijo */
.label-container {
  width: auto;
  display: inline-block;
  white-space: nowrap;
}

.info-label {
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
  white-space: nowrap;
  width: auto;
  display: inline-block;
}

.info-input {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  --padding-start: 2px;
  flex: 1;
  text-align: left;
}

/* Asegurar que el texto del input esté alineado a la izquierda con padding */
:deep(.native-input) {
  text-align: left !important;
  padding-left: 2px !important;
}

/* Ajustar el input-wrapper para una mejor distribución */
:deep(.input-wrapper) {
  display: flex;
  width: 100%;
}

:deep(.item-inner) {
  display: flex;
  width: 100%;
}
</style>