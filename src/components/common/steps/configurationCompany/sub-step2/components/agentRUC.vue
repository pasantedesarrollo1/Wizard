<template>
  <div class="info-field">
    <div class="info-label">
      <b>Agente de retención:</b> 
      <div class="info-value">
        {{ agentValueText }}
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

// Función para convertir el booleano a texto
const booleanToText = (value: boolean | undefined): string => {
  if (value === undefined) return 'No especificado';
  return value ? 'Sí' : 'No';
};

// Computed property para obtener el texto basado en el valor booleano
const agentValueText = computed(() => {
  // Verificar si existe la propiedad taxAgent y isAgent
  if (props.formData && 
      props.formData.taxAgent && 
      typeof props.formData.taxAgent.isAgent === 'boolean') {
    return booleanToText(props.formData.taxAgent.isAgent);
  }
  // Valor por defecto si no existe
  return booleanToText(false);
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