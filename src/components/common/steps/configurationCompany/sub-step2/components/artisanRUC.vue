<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <span>Selecciona e ingresa tu codigo si eres artesano</span>
    <ion-list>
      <ion-item>
        <ion-checkbox 
          slot="start"
          v-model="isArtesano"
        ></ion-checkbox>
        <ion-label>Artesano</ion-label>
      </ion-item>
    </ion-list>
    
    <!-- Campo de entrada con el mismo estilo que en taxesRUC.vue -->
    <div v-if="isArtesano" class="mt-4">
      <div class="text-sm text-gray-700 mb-1">Código de artesano</div>
      <input
        type="text"
        placeholder="Ingresa tu código de artesano"
        v-model="artisanCode"
        class="w-full border border-gray-300 rounded-md p-2 text-base"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonCheckbox } from "@ionic/vue"
import { ref, watch, onMounted } from "vue"
import { useWizardStore } from "@/stores/wizardStore"

// Obtener la instancia del store
const wizardStore = useWizardStore()

// Reactive state for checkbox and input values
const isArtesano = ref(false)
const artisanCode = ref("")

// Función para actualizar el store con los valores actuales
// const updateStore = () => {
//   const artisanNumber = isArtesano.value ? artisanCode.value: '';
//   wizardStore.updateFormSection("companyConfig", {
//       artisan: {
//         isArtisan: isArtesano.value,
//         artisanNumber: artisanNumber,
//       },
//   });
// };

// Cargar datos del store si existen
onMounted(() => {
  const companyConfig = wizardStore.getStepData("companyConfig")
  if (companyConfig) {
    if (companyConfig.artisan) {
      isArtesano.value = companyConfig.artisan.isArtisan
      artisanCode.value = companyConfig.artisan.artisanNumber || ""
    }
  }
})

// Reemplazar los dos watchers separados para isArtesano y artisanCode con este código:

// Actualizar el store cuando cambie cualquier valor
watch([isArtesano, artisanCode], ([newIsArtesano, newArtisanCode]) => {
  const artisanNumber = newIsArtesano ? newArtisanCode : ""
  wizardStore.updateFormSection("companyConfig", {
    artisan: {
      isArtisan: newIsArtesano,
      artisanNumber,
    },
  })
})

// Mantener el watcher para limpiar el código cuando se desmarca la casilla
watch(isArtesano, (newVal) => {
  if (!newVal) {
    artisanCode.value = ""
  }
})

</script>

<style lang="scss" scoped>
/* Estilos adicionales para mantener consistencia con taxesRUC.vue */
input {
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgb(0, 60, 255);
    box-shadow: 0px 0px 5px rgba(0, 60, 255, 0.25);
  }
}

/* Estilos responsivos adicionales */
@media (max-width: 576px) {
  input {
    font-size: 0.9rem;
    padding: 0.4rem;
  }
}
</style>