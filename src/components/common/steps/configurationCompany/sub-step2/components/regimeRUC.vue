<template>
  <div class="info-field">
    <div class="info-label">
      <b>Régimen:</b>
      <div class="info-value">
        {{ regimeValue }}
      </div>
    </div>
  </div>
</template>
    
<script setup lang="ts"> 
import { computed } from 'vue';

// Definir props para recibir datos del componente padre
const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

// Computed property para obtener el valor del régimen
const regimeValue = computed(() => {
  // Verificar si existe la propiedad regimeRUC
  if (props.formData && props.formData.regimeRUC !== undefined) {
    return props.formData.regimeRUC || 'No especificado';
  }
  // Valor por defecto si no existe
  return 'No especificado';
});
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