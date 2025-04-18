<template>
  <div class="p-3 rounded-lg bg-gray-50">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm text-gray-700 mb-1"> <b>Contabilidad Obligatoria:</b> Activa o desactiva si eres agente de retención y debes llevar contabilidad (opcional)</p>
      </div>
      
      <!-- Toggle Switch moderno -->
      <div 
        class="toggle-switch"
        :class="{ 'active': isAccountingRequired }"
        @click="toggleAccounting"
      >
        <div class="toggle-switch-handle"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

// Definir props para recibir datos del componente padre
const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

// Definir eventos para comunicarse con el componente padre
const emit = defineEmits(['update']);

// Computed property para obtener el valor actual de accountingRequired
const isAccountingRequired = computed(() => {
  // Verificar si existe la propiedad taxAgent y accountingRequired
  if (props.formData && 
      props.formData.taxAgent && 
      typeof props.formData.taxAgent.accountingRequired === 'boolean') {
    return props.formData.taxAgent.accountingRequired;
  }
  // Valor por defecto si no existe
  return false;
});

// Función para alternar el estado del toggle
const toggleAccounting = () => {
  // Crear una copia del objeto taxAgent actual o uno nuevo si no existe
  const updatedTaxAgent = props.formData.taxAgent 
    ? { ...props.formData.taxAgent } 
    : { isAgent: false, accountingRequired: false };
  
  // Actualizar el valor de accountingRequired
  updatedTaxAgent.accountingRequired = !isAccountingRequired.value;
  
  // Emitir evento al componente padre
  emit('update', 'taxAgent', updatedTaxAgent);
  
  console.log('Contabilidad obligatoria actualizada:', updatedTaxAgent.accountingRequired);
};

// Inicializar el componente
onMounted(() => {
  // Verificar si los datos iniciales son válidos
  if (!props.formData.taxAgent) {
    // Si no existe taxAgent, inicializarlo con valores por defecto
    emit('update', 'taxAgent', {
      isAgent: false,
      accountingRequired: false
    });
  }
});
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