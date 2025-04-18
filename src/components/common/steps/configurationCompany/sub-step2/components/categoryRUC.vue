<template>
  <div class="info-field">
    <div class="info-label">
      <b>Categoría:</b>
      <div class="info-value">
      {{ data.categoryRUC || 'No especificada' }}
    </div>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import { useInitialData } from "@/composables/useInitialData";

// Valores iniciales para el formulario
const initialValues = {
  categoryRUC: ''
};

// Usar el composable useInitialData para manejar los datos
const { data } = useInitialData(
  "companyConfig",
  initialValues,
  {
    autoSave: false, // Solo lectura, no necesitamos guardar
    debug: false
  }
);
</script>
    
<style scoped>
.info-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  transition: all 0.2s ease;
}

.info-field:hover {
  background-color: #f3f4f6;
}

.info-label {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #1f2937;
  font-size: 0.875rem;
  
}

.info-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  padding: 0.25rem 0.25rem;
}
</style>