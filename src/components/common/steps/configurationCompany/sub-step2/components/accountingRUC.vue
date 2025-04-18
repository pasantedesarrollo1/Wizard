<template>
  <div class="p-3 rounded-lg bg-gray-50">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm text-gray-700 mb-1"> <b>Contabilidad Obligatoria:</b> Activa o desactiva si eres agente de retención y debes llevar contabilidad (opcional)</p>
      </div>
      
      <!-- Toggle Switch moderno -->
      <div 
        class="toggle-switch"
        :class="{ 'active': data.taxAgent.accountingRequired }"
        @click="toggleAccounting"
      >
        <div class="toggle-switch-handle"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInitialData } from "@/composables/useInitialData";

// Valores iniciales para el formulario
const initialValues = {
  taxAgent: {
    accountingRequired: false,
    isAgent: false
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
      taxAgent: ["accountingRequired", "isAgent"]
    }
  }
);

// Función para alternar el estado del checkbox
const toggleAccounting = () => {
  updateNestedField("taxAgent", "accountingRequired", !data.value.taxAgent.accountingRequired);
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

/* Efecto hover */
.toggle-switch:hover {
  opacity: 0.9;
}
</style>