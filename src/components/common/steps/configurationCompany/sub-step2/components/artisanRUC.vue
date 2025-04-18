<template>
  <div class="p-3 rounded-lg bg-gray-50">
    <div class="flex items-center justify-between mb-4">
      <div class="flex-1">
        <p class="text-sm text-gray-700 mb-1"> <b>Artesano: </b> Activa e ingresa tu código si eres artesano (opcional)</p>
      </div>
      
      <!-- Toggle Switch moderno -->
      <div 
        class="toggle-switch"
        :class="{ 'active': data.artisan.isArtisan }"
        @click="toggleArtisan"
      >
        <div class="toggle-switch-handle"></div>
      </div>
    </div>
    
    <!-- Campo de entrada con animación de transición -->
    <div 
      class="input-container"
      :class="{ 'visible': data.artisan.isArtisan }"
    >
      <!-- <label class="text-sm text-gray-700 mb-1 block">Código de artesano</label> -->
      <div class="relative">
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <Icon icon="lsicon:number-filled" width="18" height="18" />
        </span>
        <input
          type="text"
          placeholder="Ingresa tu código de artesano"
          v-model="data.artisan.artisanNumber"
          class="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-base transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInitialData } from "@/composables/useInitialData";
import { Icon } from '@iconify/vue';

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

// Función para alternar el estado del artesano
const toggleArtisan = () => {
  const newValue = !data.value.artisan.isArtisan;
  updateNestedField("artisan", "isArtisan", newValue);

  // Si se desmarca la casilla, limpiar el código de artesano
  if (!newValue) {
    updateNestedField("artisan", "artisanNumber", "");
  }
};
</script>

<style scoped>
/* Estilo para el toggle switch */
.toggle-switch {
  position: relative;
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background-color: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-switch.active {
  background-color: #3b82f6;
}

.toggle-switch-handle {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.toggle-switch.active .toggle-switch-handle {
  left: calc(100% - 23px);
}

/* Animación para el contenedor de entrada */
.input-container {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.input-container.visible {
  max-height: 100px;
  opacity: 1;
  /* margin-top: 1rem; */
}
</style>