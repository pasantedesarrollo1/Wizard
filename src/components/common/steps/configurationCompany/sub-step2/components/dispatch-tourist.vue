<template>
  <ion-grid>
    <ion-row>
      <ion-col size="6">
      <span>Selecciona si necesitas despacho posterior                   
      </span>
        <ion-item>
          <ion-checkbox 
          slot="start"
          v-model="delayedDispatch"
          ></ion-checkbox>
          <ion-label>Despacho posterior</ion-label>
        </ion-item>
      </ion-col>
      <ion-col size="6">
      <span>Selecciona si tu empresa es establecimiento Turistico</span>
        <ion-item>
          <ion-checkbox 
          slot="start"
          v-model="isTouristEstablishment"
          ></ion-checkbox>
          <ion-label>Establecimiento Turistico</ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonCheckbox } from "@ionic/vue"
import { ref, watch, onMounted } from "vue"
import { useWizardStore } from "@/stores/wizardStore"

const wizardStore = useWizardStore()
const delayedDispatch = ref(false)
const isTouristEstablishment = ref(false)

// Cargar datos del store si existen
onMounted(() => {
  const branchAndPOS = wizardStore.getStepData("branchAndPOS")
  if (branchAndPOS && branchAndPOS.branch) {
    // Verificar si las propiedades existen y asignarlas
    delayedDispatch.value = branchAndPOS.branch.delayedDispatch || false
    isTouristEstablishment.value = branchAndPOS.branch.isTouristEstablishment || false
  }
  console.log("Valores cargados:", { delayedDispatch: delayedDispatch.value, isTouristEstablishment: isTouristEstablishment.value })
})

// Observar cambios en los valores para actualizar el store
watch([delayedDispatch, isTouristEstablishment], ([newDelayedDispatch, newIsTouristEstablishment]) => {
  // Obtener primero los datos actuales para no perder información
  const currentData = wizardStore.getStepData("branchAndPOS") || {}
  const currentBranch = currentData.branch || {}
  
  // Actualizar solo las propiedades específicas manteniendo el resto intacto
  wizardStore.updateFormSection("branchAndPOS", {
    branch: {
      ...currentBranch, // Mantener todas las propiedades existentes (idBranch, commercialName, address, etc.)
      delayedDispatch: newDelayedDispatch,
      isTouristEstablishment: newIsTouristEstablishment
    }
  })
})
</script>

<style scoped>
/* Ensure items take full width within columns */
ion-item {
  --padding-start: 0;
}
</style>