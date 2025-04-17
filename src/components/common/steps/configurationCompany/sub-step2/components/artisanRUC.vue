<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <span>Selecciona e ingresa tu codigo si eres artesano</span>
    <ion-list>
      <ion-item>
        <ion-checkbox 
          slot="start"
          v-model="data.artisan.isArtisan"
          @ionChange="handleArtisanChange"
        ></ion-checkbox>
        <ion-label>Artesano</ion-label>
      </ion-item>
    </ion-list>
    
    <!-- Campo de entrada con el mismo estilo que en taxesRUC.vue -->
    <div v-if="data.artisan.isArtisan" class="mt-4">
      <div class="text-sm text-gray-700 mb-1">Código de artesano</div>
      <input
        type="text"
        placeholder="Ingresa tu código de artesano"
        v-model="data.artisan.artisanNumber"
        class="w-full border border-gray-300 rounded-md p-2 text-base transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 sm:text-sm sm:p-1.5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonCheckbox } from "@ionic/vue"
import { useInitialData } from "@/composables/useInitialData"

// Valores iniciales para el formulario
const initialValues = {
  artisan: {
    isArtisan: false,
    artisanNumber: ""
  }
};

// Usar el composable useInitialData para manejar los datos
const { data, updateNestedField } = useInitialData(
  "companyConfig",
  initialValues,
  {
    autoSave: true,
    debug: false,
    nestedFields: {
      artisan: ["isArtisan", "artisanNumber"]
    }
  }
);

// Función para manejar el cambio en el checkbox de artesano
const handleArtisanChange = () => {
  // Si se desmarca la casilla, limpiar el código de artesano
  if (!data.value.artisan.isArtisan) {
    updateNestedField("artisan", "artisanNumber", "");
  }
};
</script>