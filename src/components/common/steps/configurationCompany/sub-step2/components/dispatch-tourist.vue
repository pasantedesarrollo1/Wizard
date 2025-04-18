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
          :class="{ 'active': isDelayedDispatch }"
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
          :class="{ 'active': isTouristEstablishment }"
          @click="toggleTourist"
        >
          <div class="toggle-switch-handle"></div>
        </div>
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

// Computed property para obtener el estado actual de delayedDispatch
const isDelayedDispatch = computed(() => {
  // Verificar si existe la propiedad branch y delayedDispatch
  if (props.formData && 
      props.formData.branch && 
      typeof props.formData.branch.delayedDispatch === 'boolean') {
    return props.formData.branch.delayedDispatch;
  }
  // Valor por defecto si no existe
  return false;
});

// Computed property para obtener el estado actual de isTouristEstablishment
const isTouristEstablishment = computed(() => {
  // Verificar si existe la propiedad branch y isTouristEstablishment
  if (props.formData && 
      props.formData.branch && 
      typeof props.formData.branch.isTouristEstablishment === 'boolean') {
    return props.formData.branch.isTouristEstablishment;
  }
  // Valor por defecto si no existe
  return false;
});

// Función para alternar el estado de despacho posterior
const toggleDispatch = () => {
  // Crear una copia del objeto branch actual o uno nuevo si no existe
  const updatedBranch = props.formData.branch 
    ? { ...props.formData.branch } 
    : { 
        delayedDispatch: false, 
        isTouristEstablishment: false,
        idBranch: "",
        commercialName: "",
        address: ""
      };
  
  // Actualizar el valor de delayedDispatch
  updatedBranch.delayedDispatch = !isDelayedDispatch.value;
  
  // Emitir evento al componente padre
  emit('update', 'branch', updatedBranch);
  
  console.log('Estado de despacho posterior actualizado:', updatedBranch.delayedDispatch);
};

// Función para alternar el estado de establecimiento turístico
const toggleTourist = () => {
  // Crear una copia del objeto branch actual o uno nuevo si no existe
  const updatedBranch = props.formData.branch 
    ? { ...props.formData.branch } 
    : { 
        delayedDispatch: false, 
        isTouristEstablishment: false,
        idBranch: "",
        commercialName: "",
        address: ""
      };
  
  // Actualizar el valor de isTouristEstablishment
  updatedBranch.isTouristEstablishment = !isTouristEstablishment.value;
  
  // Emitir evento al componente padre
  emit('update', 'branch', updatedBranch);
  
  console.log('Estado de establecimiento turístico actualizado:', updatedBranch.isTouristEstablishment);
};

// Inicializar el componente
onMounted(() => {
  // Verificar si los datos iniciales son válidos
  if (!props.formData.branch) {
    // Si no existe branch, inicializarlo con valores por defecto
    emit('update', 'branch', {
      delayedDispatch: false,
      isTouristEstablishment: false,
      idBranch: "",
      commercialName: "",
      address: ""
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
</style>