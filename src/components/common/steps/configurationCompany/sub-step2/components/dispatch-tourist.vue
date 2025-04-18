<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
    <!-- Despacho posterior -->
    <div class="p-2 rounded-lg bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-sm text-gray-700"> <b>Despacho Posterior: </b>Activa si necesitas despacho posterior</p>
        </div>
        
        <!-- Toggle Switch moderno -->
        <div 
          class="toggle-switch"
          :class="{ 'active': data.branch.delayedDispatch }"
          @click="toggleDispatch"
        >
          <div class="toggle-switch-handle"></div>
        </div>
      </div>
    </div>
    
    <!-- Establecimiento Turístico -->
    <div class="p-2 rounded-lg bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-sm text-gray-700"> <b>Establecimiento Turístico</b> Activa si tu empresa es establecimiento turístico</p>
        </div>
        
        <!-- Toggle Switch moderno -->
        <div 
          class="toggle-switch"
          :class="{ 'active': data.branch.isTouristEstablishment }"
          @click="toggleTourist"
        >
          <div class="toggle-switch-handle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInitialData } from "@/composables/useInitialData";
// Valores iniciales para el formulario
const initialValues = {
  branch: {
    delayedDispatch: false,
    isTouristEstablishment: false,
    // Incluimos campos vacíos para otros valores que puedan existir en branch
    idBranch: "",
    commercialName: "",
    address: ""
  }
};

// Usar el composable useInitialData para manejar los datos
const { data, updateNestedField } = useInitialData(
  "branchAndPOS",
  initialValues,
  {
    autoSave: true,
    debug: false,
    nestedFields: {
      branch: ["delayedDispatch", "isTouristEstablishment", "idBranch", "commercialName", "address"]
    }
  }
);

// Funciones para alternar los estados
const toggleDispatch = () => {
  updateNestedField("branch", "delayedDispatch", !data.value.branch.delayedDispatch);
};

const toggleTourist = () => {
  updateNestedField("branch", "isTouristEstablishment", !data.value.branch.isTouristEstablishment);
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
</style>